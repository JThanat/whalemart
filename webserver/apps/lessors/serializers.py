from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Lessor

User = get_user_model()

class LessorSerializer(serializers.Serializer):
    lessor_name = serializers.CharField(required=True, max_length=100)
    user_id = serializers.IntegerField(required=True)

    def create(self, validated_data):
        return Lessor.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.lessor_name = validated_data.get('lessor_name', instance.lessor_name)
        instance.save()
        return instance