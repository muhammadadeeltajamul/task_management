import re

from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer, ValidationError


User = get_user_model()


class SignUpSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def validate(self, data):
        errors = []
        password = data.get("password")
        if not password:
            errors.append("Password cannot be empty")
        if len(password) < 8:
            errors.append("Length must be atleast 8 characters")
        if len(password) > 32:
            errors.append("Length must be less then or equal to 32 characters")
        if not re.search(r'[A-Za-z]', password):
            errors.append("Password must contain one alphabet")
        if not re.search(r'\d', password):
            errors.append("Password must contain one numeric digit")
        if errors:
            raise ValidationError({"password": errors})
        return data
