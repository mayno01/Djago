import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def chat_with_rasa(request):
    if request.method == 'POST':
        # Parse JSON payload
        body = json.loads(request.body)
        user_message = body.get('message', '')

        rasa_url = 'http://localhost:5005/webhooks/rest/webhook'
        payload = {
            'sender': 'user',
            'message': user_message
        }
        response = requests.post(rasa_url, json=payload)

        if response.status_code == 200:
            rasa_response = response.json()
            return JsonResponse(rasa_response, safe=False)
        else:
            return JsonResponse({'error': 'Failed to communicate with Rasa.'}, status=response.status_code)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
