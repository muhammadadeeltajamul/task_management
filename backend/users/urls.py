from django.urls import re_path
from users.views import LoginView, SignUpView

urlpatterns = [
    re_path('login/?$', LoginView.as_view(), name='user_login'),
    re_path('signup/?$', SignUpView.as_view(), name='user_signup'),
]
