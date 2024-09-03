import jwt

from django.conf import settings
from rest_framework import HTTP_HEADER_ENCODING
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPE_BYTES
from rest_framework_simplejwt.settings import api_settings


def get_header_from_request(request):
    header = request.META.get(api_settings.AUTH_HEADER_NAME)
    if isinstance(header, str):
        header = header.encode(HTTP_HEADER_ENCODING)
    return header


def get_raw_token_from_header(header):
    parts = header.split()
    if len(parts) == 0:
        return None
    if parts[0] not in AUTH_HEADER_TYPE_BYTES:
        return None
    if len(parts) != 2:
        raise AuthenticationFailed('Authorization header must contain two space-delimited values')
    return parts[1]


def get_token_from_request(request):
    try:
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
        if token is None:
            header = get_header_from_request(request)
            token = get_raw_token_from_header(header)
    except Exception:
        pass
    return token


def get_payload_from_token(token):
    jwt_settings = settings.SIMPLE_JWT
    return jwt.decode(token, key=jwt_settings['SIGNING_KEY'],
                      algorithms=jwt_settings['ALGORITHM'])


def get_username_from_payload(payload):
    return payload.get(settings.SIMPLE_JWT['USER_ID_CLAIM'], None)


def get_username_from_token(token):
    if not token:
        raise AuthenticationFailed('Invalid token')
    payload = get_payload_from_token(token)
    username = get_username_from_payload(payload)
    return username
