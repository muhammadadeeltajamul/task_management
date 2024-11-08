from django.urls import re_path
from users.views import LoginView, SignUpView, logout_api_view

urlpatterns = [
    re_path('login/?$', LoginView.as_view(), name='user_login'),
    re_path('signup/?$', SignUpView.as_view(), name='user_signup'),
    re_path('logout/?$', logout_api_view, name='user_logout')
]
