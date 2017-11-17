from rest_framework import serializers

from .models import Booth
import re


class BoothSerializer(serializers.ModelSerializer):
    market = serializers.HiddenField(default=0)

    class Meta:
        model = Booth
        fields = ('booth_number', 'rental_fee', 'market')

    def validate_booth_number(self, data):
        if not re.match(r'^[A-Za-z0-9]+$', data):
            raise serializers.ValidationError('Booth number should be only number or letter')
        return data

