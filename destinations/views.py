# views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import Destination
from .serializers import DestinationSerializer
from rest_framework.parsers import MultiPartParser, FormParser
import genai
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    parser_classes = (MultiPartParser, FormParser)  # Allow file uploads

    def perform_create(self, serializer):
        serializer.save()  # Save the instance


def ai_generate_description(title):
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"Generate a detailed description for a destination with the title in 4 lines: {title}"
    response = model.generate_content(prompt)
    return response.text

    
@csrf_exempt  # Use only for testing; set up CSRF tokens in production
def generate_description(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title', '')

            if not title:
                return JsonResponse({'error': 'Title is required'}, status=400)

            description = ai_generate_description(title)  # Use AI to generate description
            return JsonResponse({'description': description}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
