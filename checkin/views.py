# checkin/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests

@csrf_exempt  # Use this decorator to disable CSRF protection for testing
def check_in(request):
    if request.method == 'POST':
        # Check for JSON data
        if request.content_type == 'application/json':
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)
            prompt = body_data.get('prompt')
        else:
            # Handle form-encoded data
            prompt = request.POST.get('prompt')

        if not prompt:
            return JsonResponse({'error': 'No prompt provided'}, status=400)

        try:
            # Call external API (if needed)
            response = requests.post('http://127.0.0.1:5000', json={'prompt': prompt})
            response_data = response.json()

            # Adding images to the response
            response_data['images'] = [
                'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDF8fGhvdGVsfGVufDB8fHx8MTY5NzM3NTQyNQ&ixlib=rb-4.0.3&q=80&w=1080',
                'https://images.unsplash.com/photo-1604401045723-2aafc7c1bba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDEwfHxob3RlbHxlbnwwfHx8fDE2OTczNzU0Mzg&ixlib=rb-4.0.3&q=80&w=1080',
                'https://images.unsplash.com/photo-1607327080693-51c67371b0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3N3wwfDF8c2VhcmNofDB8fGhvdGVsfGVufDB8fHx8MTY5NzM3NTU0Ng&ixlib=rb-4.0.3&q=80&w=1080'
            ]
            return JsonResponse(response_data)

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
