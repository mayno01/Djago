import pandas as pd

def load_data():
    # Update this path based on where your CSV file is located
    file_path = 'C:\\Users\\tarek\\Downloads\\Djago-UserAuth\\Djago-UserAuth\\recommender\\data\\Seattle_Hotels.csv'
    df = pd.read_csv(file_path, encoding='ISO-8859-1').dropna()  # Specify the encoding

    # Display initial data
    print("Initial data shape:", df.shape)
    print("Initial data columns:", df.columns.tolist())

    # Rename columns for easier access (if needed)
    df.columns = ['name', 'address', 'description']  # Adjust this according to your CSV structure

    # Extracting useful features from the address (optional)
    df['city'] = df['address'].apply(lambda x: extract_city(x))
    df['state'] = df['address'].apply(lambda x: extract_state(x))

    # Example of further processing: Checking for descriptions with specific keywords
    df['has_pool'] = df['description'].str.contains('pool', case=False, na=False).astype(int)

    # Additional processing steps can be added here
    df.fillna("", inplace=True)  # Fill any remaining NaN values

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

# Example of running the load_data function
if __name__ == "__main__":
    data = load_data()
    print(data.head())  # Display the first few rows of the processed DataFrame
