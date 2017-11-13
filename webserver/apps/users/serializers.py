from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import CreditCard

User = get_user_model()


class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('card_number', 'card_holder_name', 'type', 'expiry_date', 'verification_no')


class UserSerializer(serializers.ModelSerializer):
    credit_cards = CreditCardSerializer(many=True)

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

    def create(self, validated_data):
        credit_cards_data = validated_data.pop('credit_cards', None)
        user = User.objects.create(**validated_data)
        for credit_card_data in credit_cards_data:
            CreditCard.objects.create(user=user, **credit_card_data)
        return user

    def update(self, instance, validated_data):
        pass