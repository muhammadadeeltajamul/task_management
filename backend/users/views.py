from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from users.utils import get_response_object


class LoginView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({"message": "Already logged in"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        if not (email or password):
            message = 'email and password field is required for login'
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)
        if not user:
            return Response({"message": "Invalid email/password"}, status=status.HTTP_401_UNAUTHORIZED)
        return get_response_object(user)
