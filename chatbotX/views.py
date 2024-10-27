import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import respond_ml

@csrf_exempt
def chatbot_response(request):
    if request.method == "POST":
        # Parse JSON data if the content type is JSON
        if request.content_type == "application/json":
            data = json.loads(request.body)
        else:
            data = request.POST

        user_input = data.get("message")
        
        if not user_input:
            return JsonResponse({"error": "No message provided"}, status=400)
        
        response = respond_ml(user_input)
        return JsonResponse({"response": response})

    return JsonResponse({"error": "Invalid request"}, status=400)
