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
        credit_cards_data = validated_data.pop('credit_cards', None)
        instance = super(UserSerializer, self).update(instance, validated_data)

        current_credit_cards = CreditCard.objects.filter(user=instance.id)
        validated_credit_cards = []
        for credit_card_data in credit_cards_data:
            # Update existing credit card
            credit_card_id = credit_card_data.get('id', None)
            if credit_card_id:
                credit_card_obj = CreditCard.objects.get(id=credit_card_id)
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
                CreditCard.objects.create(user=instance, **credit_card_data)
        # Delete credit card deleted by frontend
        to_delete_credit_cards = set(current_credit_cards) - set(validated_credit_cards)
        for credit_card_obj in to_delete_credit_cards:
            credit_card_obj.delete()
        return instance
