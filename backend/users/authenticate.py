from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication as JWT

from .models import Users
from .utils import get_token_from_request, get_email_from_token


class JWTAuthentication(JWT):

    def authenticate(self, request):
        try:
            token = get_token_from_request(request)
            if not token:
                return None
            email = get_email_from_token(token)
            email = str(email).lower().strip()
            if not email:
                return None
            user = get_object_or_404(Users, email=email)
            return user, token
        except Exception as exc:
            print('Error logging in ', exc)
            return None
