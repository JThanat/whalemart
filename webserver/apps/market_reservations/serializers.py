from rest_framework import serializers
from .models import MarketReservation


class MarketReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketReservation
        fields = ('Shop Name','Reservation Time','Status')