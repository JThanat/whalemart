from rest_framework import serializers

from .models import Booth


class BoothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booth
        fields = ('booth_number', 'rental_fee', 'user')
