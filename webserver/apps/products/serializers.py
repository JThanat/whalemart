from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Product

User = get_user_model()


class ProductSerializerWithoutUser(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'image')
        extra_kwargs = {
            'id': {'read_only': True}
        }


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'image', 'user')
