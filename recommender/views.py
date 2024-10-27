from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import joblib
import os

# Load the saved model with error handling
model_path = 'C:\\Users\\tarek\\Downloads\\Djago-UserAuth\\Djago-UserAuth\\recommender\\ml_model\\hotel_recommender_model.pkl'

try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        if model is None:
            raise RuntimeError("The model file is empty or corrupted.")
    else:
        raise FileNotFoundError(f"Model file not found: {model_path}")
except EOFError:
    raise RuntimeError("The model file is empty or corrupted.")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Load the hotel dataset (update the path accordingly)
csv_path = 'C:\\Users\\tarek\\Downloads\\Djago-UserAuth\\Djago-UserAuth\\recommender\\data\\Hotel_Reviews.csv'

@api_view(['POST'])
def predict_hotel_view(request):
    """
    Predict hotel clusters based on input features provided in the request.
    Expects a JSON body with features.
    """
    try:
        # Ensure the request body is parsed correctly
        data = request.data

        # Validate the data
        expected_keys = ['name', 'address', 'desc', 'city', 'state', 'has_pool']
        if not all(key in data for key in expected_keys):
            return Response({"error": f"Missing one of the required keys: {expected_keys}"}, status=400)

        # Convert to DataFrame
        features_df = pd.DataFrame([data])  # Create DataFrame from a list of one dictionary

        # Make prediction
        prediction = model.predict(features_df)

        return Response({"predicted_clusters": prediction.tolist()})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
@api_view(['GET'])
def recommend_hotels_view(request):
    """
    Recommend hotels based on the name provided in the request.
    Expects a query parameter 'name'.
    """
    name = request.query_params.get('name', None)
    
    if name is None:
        return Response({"error": "Hotel name parameter is required."}, status=400)
    
    # Load the hotel reviews CSV file
    csv_path = 'C:\\Users\\tarek\\Downloads\\Djago-UserAuth\\Djago-UserAuth\\recommender\\data\\Hotel_Reviews.csv'
    try:
        # Specify encoding (try 'ISO-8859-1' or 'windows-1252' if UTF-8 fails)
        hotels_df = pd.read_csv(csv_path, encoding='ISO-8859-1')

        # Strip whitespace and make comparison case insensitive
        hotels_df['Hotel_Name'] = hotels_df['Hotel_Name'].str.strip().str.lower()
        name = name.strip().lower()  # Strip whitespace and make input lower case
        
        # Filter hotels by name
        recommended_hotels = hotels_df[hotels_df['Hotel_Name'] == name]

        # Check if any hotels were found
        if recommended_hotels.empty:
            return Response({"message": "No hotels found with that name."}, status=404)

        # Return recommended hotels
        hotels_list = recommended_hotels[['Hotel_Name', 'Hotel_Address']].to_dict(orient='records')
        return Response({"recommended_hotels": hotels_list})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
