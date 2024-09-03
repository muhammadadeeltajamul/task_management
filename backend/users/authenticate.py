from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication as JWT

from .models import Users
from .utils import get_token_from_request, get_username_from_token


class JWTAuthentication(JWT):

    def authenticate(self, request):
        try:
            token = get_token_from_request(request)
            if not token:
                return None
            username = get_username_from_token(token)
            username = str(username).lower().strip()
            if not username:
                return None
            user = get_object_or_404(Users, username=username)
            return user, token
        except Exception as exc:
            print('Error logging in ', exc)
            return None
