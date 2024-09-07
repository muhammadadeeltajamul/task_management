from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView

from users.utils import get_response_object


class LoginView(APIView):
    def post(self, request):
        email = request.POST.get('email', '')
        password = request.POST.get('password', '')
        if not (email or password):
            raise ValidationError('email and password field is required for login')
        user = authenticate(email=email, password=password)
        if not user:
            raise ValidationError('Invalid email / password')
        return get_response_object(user)
