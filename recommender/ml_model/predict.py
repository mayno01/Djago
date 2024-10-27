import joblib
import pandas as pd
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

def predict_hotel(features):
    """
    Predicts the hotel cluster given input features.
    
    :param features: DataFrame with the features for prediction
    :return: List of predicted hotel clusters
    """
    # Validate the input features
    if not isinstance(features, pd.DataFrame):
        raise ValueError("Input features must be a pandas DataFrame.")
    
    # Check if features have the correct columns
    expected_columns = ['name', 'address', 'desc', 'city', 'state', 'has_pool']  # Update with your actual feature column names
    if not all(col in features.columns for col in expected_columns):
        raise ValueError(f"Input DataFrame must contain the following columns: {expected_columns}")
    
    # Make predictions
    prediction = model.predict(features)
    return prediction.tolist()

# Example usage (if needed):
if __name__ == "__main__":
    # Sample input for prediction
    sample_data = {
        'name': ['Hotel ABC'],
        'address': ['123 Example St, CityName, StateName'],
        'desc': ['This hotel has a pool and great service.'],
        'city': ['CityName'],
        'state': ['StateName'],
        'has_pool': [1]  # Example feature
    }
    
    # Correctly create a DataFrame
    features_df = pd.DataFrame(sample_data)

    # Make sure to pass the DataFrame correctly
    predictions = predict_hotel(features_df)
    print("Predicted hotel clusters:", predictions)
