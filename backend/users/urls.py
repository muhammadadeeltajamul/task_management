from django.urls import re_path
from users.views import LoginView

urlpatterns = [
    re_path('login/?$', LoginView.as_view(), name='user_login'),
]
