from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone', 'facebook_token')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        data['username'] = data['email']
        data['password'] = make_password(data['password'])
        return data
