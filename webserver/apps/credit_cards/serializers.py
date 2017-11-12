from rest_framework import serializers

from .models import CreditCard

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ('card_number', 'card_holder_name', 'type', 'expiry_date', 'verification_no')