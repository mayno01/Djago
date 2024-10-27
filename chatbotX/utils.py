import en_core_web_lg
import numpy as np
import re
from sklearn.svm import SVC
from collections import defaultdict

# Initialize NLP and ML models
nlp = en_core_web_lg.load()
clf = SVC(C=1, gamma="auto", probability=True)

# Sample training data and intents for ML model (updated)
training_sentences = [
    "What is the room type you want?",
    "Which type would you like for your room?",
    "Which type do you want for your room?",
    "What time will you check-in?",
    "When can we expect you to get here?",
    "At what hour will you be here?",
    "Can you recommend a hotel in London?",
    "What are the best hotels in London?",
    "Suggest a good hotel for me in London.",
    "What hotel should I stay at in London?"
]
training_intents = [
    "roomtype",
    "roomtype",
    "roomtype",
    "checkin",
    "checkin",
    "checkin",
    "hotel_recommendation",
    "hotel_recommendation",
    "hotel_recommendation",
    "hotel_recommendation"
]

# Exact responses dictionary
responses_exact = {
    "What is the room type you want?": "Double bed",
    "What time will you check-in?": "At 6 pm",
    "default": "Have a nice day!"
}

# Define responses for hotel recommendations
responses_ml = {
    "roomtype": "Double bed",
    "checkin": "At 6 pm",
    "hotel_recommendation": "I recommend staying at The Ritz London, The Langham, or The Savoy. Would you like to know more about any specific hotel?",
    "default": "Goodbye!"
}

# Helper function for exact matches
def respond_exact(text):
    response = responses_exact.get(text.lower(), responses_exact["default"])
    return response

# Define intent keywords for regex-based matching
intent_keywords = {
    'roomtype': ['room', 'type', 'type of room', 'bed'],
    'checkin': ['time', 'when', 'get here', 'checkin', 'hour'],
    'hotel_recommendation': ['recommend', 'best', 'suggest', 'hotel', 'stay', 'London']
}
patterns = {intent: re.compile('|'.join(keys)) for intent, keys in intent_keywords.items()}

# Intent matching using regex patterns
def get_intent_re(message):
    for intent, pattern in patterns.items():
        if pattern.search(message.lower()):
            return intent
    return "default"

# Function to train the ML model
def load_model():
    X_train = np.zeros((len(training_sentences), nlp.vocab.vectors_length))
    for i, sentence in enumerate(training_sentences):
        doc = nlp(sentence)
        X_train[i, :] = doc.vector
    clf.fit(X_train, training_intents)

# Function to predict intent using ML model
def get_intent_ml(text):
    doc = nlp(text)
    return clf.predict([doc.vector])[0]

# Generate response based on the ML intent
def respond_ml(text):
    response = responses_ml.get(get_intent_ml(text), responses_ml["default"])
    return response

# Function to extract entities from user text
def get_all_entities(text):
    doc = nlp(text)
    entities = defaultdict(list)
    for ent in doc.ents:
        entities[ent.label_].append(ent.text)
    return entities

# Initialize the ML model once by calling load_model()
load_model()
