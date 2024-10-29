from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(APIView):
    def post(self, request):
        serializer = ResetPasswordEmailSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Password reset link sent"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        serializer = ResetPasswordConfirmSerializer(data={**request.data, 'uidb64': uidb64, 'token': token})
        if serializer.is_valid():
            return Response({"message": "Password has been reset"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
