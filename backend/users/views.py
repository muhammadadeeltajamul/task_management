from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers import SignUpSerializer
from users.utils import get_logout_response, get_response_object


class LoginView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return get_response_object(request.user)
        return Response({"message": "Not Logged In"}, status=status.HTTP_401_UNAUTHORIZED)

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


class SignUpView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({"message": "Already logged in"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        if not (email or password):
            message = 'email and password field is required for creating account'
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SignUpSerializer(data={"email": email, "password": password})
        if not serializer.is_valid():
            errors_list = []
            for errors in serializer.errors.values():
                errors_list.extend(errors)
            return Response({"message": errors_list}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        return get_response_object(user)



@api_view(['GET', 'POST'])
def logout_api_view(request):
    return get_logout_response()
