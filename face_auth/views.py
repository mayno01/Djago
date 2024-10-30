import face_recognition
from django.http import JsonResponse
from rest_framework.decorators import api_view
import numpy as np
import base64
import cv2

# Load and encode a sample face (in practice, store user face encodings in DB)
known_face = face_recognition.load_image_file("face_auth/static/images/known_user.jpg")  # Pre-saved image
known_face_encoding = face_recognition.face_encodings(known_face)[0]

@api_view(['POST'])
def face_login(request):
    try:
        # Get the image sent from Angular as Base64
        data = request.data.get("image")
        if not data:
            return JsonResponse({"success": False, "error": "No image data received."})

        # Decode the image data
        img_data = data.split(',')[1]  # Strip off the metadata part
        img_data = base64.b64decode(img_data)
        np_img = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        if frame is None:
            return JsonResponse({"success": False, "error": "Image could not be decoded."})

        # Encode the received face
        unknown_face_encodings = face_recognition.face_encodings(frame)

        if len(unknown_face_encodings) > 0:
            results = face_recognition.compare_faces([known_face_encoding], unknown_face_encodings[0])
            if results[0]:
                # If face matches, generate JWT token
                from rest_framework_simplejwt.tokens import AccessToken
                token = AccessToken.for_user(request.user)  # Assuming user is authenticated
                return JsonResponse({"success": True, "token": str(token)})
            else:
                return JsonResponse({"success": False, "error": "Face not recognized."})
        else:
            return JsonResponse({"success": False, "error": "No face detected."})

    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)})
