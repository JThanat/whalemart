import re
import requests
import ast

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import CreditCard

User = get_user_model()


class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('id', 'card_number', 'card_holder_name', 'type', 'expiry_date', 'verification_no')
        extra_kwargs = {
            'id': {'read_only': False, 'required': False}
        }


class RegistrationSerializer(serializers.ModelSerializer):
    facebook_token = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'phone', 'facebook_token')
        extra_kwargs = {
            'password': {'write_only': True},
            'is_verified': {'read_only': True},
        }

    def validate_phone(self, value):
        if (value is None) or re.match(r"^\+?\d{9,15}$", value):
            return value
        raise serializers.ValidationError('Phone number should be in format +123456789')

    def validate_facebook_token(self, value):
        if value != '':
            is_success, response = get_facebook_id(value)
            if is_success:
                if len(User.objects.filter(facebook_id=response)) != 0:
                    raise serializers.ValidationError('This facebook is already used', response)
                return response
            raise serializers.ValidationError('Invalid facebook token', response)
        return ''

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['facebook_id'] = validated_data.pop('facebook_token', '')
        return User.objects.create(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    credit_cards = CreditCardSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'phone', 'is_verified', 'profile_image', 'credit_cards')
        extra_kwargs = {
            'is_verified': {'read_only': True},
            'email': {'read_only': True},
        }

    def update(self, instance, validated_data):
        credit_cards_data = validated_data.pop('credit_cards', None)
        instance = super(UserSerializer, self).update(instance, validated_data)

        current_credit_cards = CreditCard.objects.filter(user=instance.id)
        validated_credit_cards = []
        for credit_card_data in credit_cards_data:
            # Update existing credit card
            credit_card_id = credit_card_data.get('id', None)
            if credit_card_id:
                credit_card_obj = CreditCard.objects.get(id=credit_card_id)
                credit_card_obj.user = instance
                credit_card_obj.card_number = credit_card_data.get('card_number', credit_card_obj.card_number)
                credit_card_obj.card_holder_name = credit_card_data.get('card_holder_name',
                                                                        credit_card_obj.card_holder_name)
                credit_card_obj.type = credit_card_data.get('type', credit_card_obj.type)
                credit_card_obj.expiry_date = credit_card_data.get('expiry_date', credit_card_obj.expiry_date)
                credit_card_obj.verification_no = credit_card_data.get('verification_no',
                                                                       credit_card_obj.verification_no)
                credit_card_obj.save()
            # Create new credit card
            else:
                credit_card_obj = CreditCard.objects.create(user=instance, **credit_card_data)
                validated_credit_cards.append(credit_card_obj)
        # Delete credit card deleted by frontend
        to_delete_credit_cards = set(current_credit_cards) - set(validated_credit_cards)
        for credit_card_obj in to_delete_credit_cards:
            credit_card_obj.delete()
        return instance


def get_facebook_id(facebook_token):
    url = 'https://graph.facebook.com/me?fields=id&access_token=' + facebook_token
    response = requests.get(url)
    if response.status_code == 200:
        response_dict = ast.literal_eval(response.content.decode("utf-8"))
        return True, response_dict['id']
    return False, response
