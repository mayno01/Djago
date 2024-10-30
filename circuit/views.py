# circuit/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Circuit, Review
from .serializers import CircuitSerializer, ReviewSerializer
import requests

class CircuitViewSet(viewsets.ModelViewSet):
    queryset = Circuit.objects.all()
    serializer_class = CircuitSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class RecommendationViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def get_recommendations(self, request):
        print("Received request:", request.data)
        budget = request.data.get("budget")
        num_people = request.data.get("num_people")
        days_of_travel = request.data.get("days_of_travel")
        preferred_difficulty = request.data.get("preferred_difficulty")
        preferred_rating = request.data.get("preferred_rating")

        # Create payload for FastAPI
        payload = {
            "budget": float(budget),
            "num_people": int(num_people),
            "days_of_travel": int(days_of_travel),
            "preferred_difficulty": int(preferred_difficulty),
            "preferred_rating": float(preferred_rating),
        }

        try:
            # Make a POST request to the FastAPI recommendations endpoint
            response = requests.post("http://127.0.0.1:8001/recommendations/", json=payload)


            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response({"error": "Failed to fetch recommendations from FastAPI."}, status=response.status_code)

        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

