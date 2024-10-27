import joblib
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import classification_report, accuracy_score

def load_data():
    # Update this path based on where your CSV file is located
    file_path = 'C:\\Users\\tarek\\Downloads\\Djago-UserAuth\\Djago-UserAuth\\recommender\\data\\Seattle_Hotels.csv'
    df = pd.read_csv(file_path, encoding='ISO-8859-1').dropna()  # Specify the encoding

    # Display initial data
    print("Initial data shape:", df.shape)
    print("Initial data columns:", df.columns)

    # Rename columns for easier access (if needed)
    df.columns = ['name', 'address', 'desc']  # Update as per your actual dataset

    # Extracting useful features from the address (optional)
    df['city'] = df['address'].apply(lambda x: extract_city(x))
    df['state'] = df['address'].apply(lambda x: extract_state(x))
    
    # Example of further processing: Checking for descriptions with specific keywords
    df['has_pool'] = df['desc'].str.contains('pool', case=False, na=False).astype(int)

    # Fill any remaining NaN values
    df.fillna("", inplace=True)

    return df

def extract_city(address):
    """Extract city from address."""
    try:
        return address.split(',')[1].strip()  # Assumes city is the second item after splitting by ','
    except IndexError:
        return None

def extract_state(address):
    """Extract state from address."""
    try:
        return address.split(',')[2].strip().split(' ')[0]  # Assumes state is the third item
    except IndexError:
        return None

def train_model():
    # Load and preprocess data
    df = load_data()

    # Check if there are enough samples for training
    if df.empty:
        raise ValueError("No data found in the dataset after loading.")

    # Prepare features and target
    X = df[['name', 'address', 'desc', 'city', 'state', 'has_pool']]  # Adjust this according to your feature set
    y = pd.Series([0] * len(df))  # Replace this with your actual target variable

    # One-hot encoding for categorical features
    categorical_features = ['name', 'address', 'desc', 'city', 'state']
    numerical_features = ['has_pool']

    # Create a column transformer for preprocessing
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )

    # Split the data into training and validation sets
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=0)

    # Initialize and train the model using a pipeline
    clf = make_pipeline(preprocessor, RandomForestClassifier(n_estimators=273, max_depth=10, random_state=0))
    
    # Fit the model
    clf.fit(X_train, y_train)

    # Validate the model
    y_pred = clf.predict(X_val)
    accuracy = accuracy_score(y_val, y_pred)
    report = classification_report(y_val, y_pred)

    print("Model training complete with accuracy: {:.2f}%".format(accuracy * 100))
    print("Classification Report:\n", report)

    # Ensure the directory exists
    model_dir = 'recommender/ml_model/'
    os.makedirs(model_dir, exist_ok=True)

    # Save the model
    joblib.dump(clf, os.path.join(model_dir, 'hotel_recommender_model.pkl'))
    print("Model saved as 'hotel_recommender_model.pkl'")

if __name__ == "__main__":
    train_model()
