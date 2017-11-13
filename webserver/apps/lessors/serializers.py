from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Lessor

User = get_user_model()

class LessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = ('lessor_name', 'user')
