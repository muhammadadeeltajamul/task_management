import datetime
import jwt

from django.conf import settings
from rest_framework import HTTP_HEADER_ENCODING, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
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


def get_email_from_payload(payload):
    return payload.get(settings.SIMPLE_JWT['USER_ID_CLAIM'], None)


def get_email_from_token(token):
    if not token:
        raise AuthenticationFailed('Invalid token')
    payload = get_payload_from_token(token)
    email = get_email_from_payload(payload)
    return email


def get_user_data(user):
    response_data = {
        "email": user.email,
    }
    return response_data


def encode_data_jwt(payload):
    return jwt.encode(payload, key=settings.SIMPLE_JWT['SIGNING_KEY'], algorithm=settings.SIMPLE_JWT['ALGORITHM'])


decode_data_jwt = get_payload_from_token


def get_tokens_for_user(user):
    def convert_time(time):
        return int(time.timestamp())
    user_data = get_user_data(user)
    access_token_payload = user_data.copy()

    access_name = settings.SIMPLE_JWT['AUTH_COOKIE']
    refresh_name = settings.SIMPLE_JWT['REFRESH_COOKIE']
    access_token_delta = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
    refresh_token_delta = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
    current_utc_time = datetime.datetime.now(datetime.timezone.utc)
    access_token_payload["iat"] = convert_time(current_utc_time)
    access_token_payload["exp"] = convert_time(current_utc_time + access_token_delta)

    refresh_token_payload = access_token_payload.copy()
    refresh_token_payload["exp"] = convert_time(current_utc_time + refresh_token_delta)
    return {
        access_name: encode_data_jwt(access_token_payload),
        refresh_name: encode_data_jwt(refresh_token_payload),
    }


def add_cookies_to_response(response, user):
    tokens = get_tokens_for_user(user)
    access_token_cookie_name = settings.SIMPLE_JWT['AUTH_COOKIE']
    refresh_token_cookie_name = settings.SIMPLE_JWT['REFRESH_COOKIE']
    access_token_life = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
    refresh_token_life = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
    is_http_only_cookie = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY']
    cookie_secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE']
    cookie_samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
    cookies = [
        {'key': access_token_cookie_name, 'value': tokens[access_token_cookie_name], 'expires': access_token_life},
        {'key': refresh_token_cookie_name, 'value': tokens[refresh_token_cookie_name], 'expires': refresh_token_life},
        {'key': 'email', 'value': user.email, 'expires': access_token_life + refresh_token_life},
    ]
    for cookie_data in cookies:
        response.set_cookie(
            **cookie_data,
            secure=cookie_secure,
            httponly=is_http_only_cookie,
            samesite=cookie_samesite
            )
    return response


def get_response_object(user):
    response = Response(status=status.HTTP_200_OK)
    response = add_cookies_to_response(response, user)
    response.data = get_user_data(user)
    return response
