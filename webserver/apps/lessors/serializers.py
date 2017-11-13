from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Lessor

User = get_user_model()

class LessorWithoutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = ('lessor_name', )

class LessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = ('lessor_name', 'user')

    def update(self, instance, validated_data):
        instance.lessor_name = validated_data.get('lessor_name', instance.lessor_name)
        instance.save()
        return instance