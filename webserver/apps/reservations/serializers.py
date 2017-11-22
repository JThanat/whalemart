from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ('id', 'shop_name', 'reservation_time', 'status', 'booth')
        extra_kwargs = {
            'status': { 'read_only': True },
            'reservation_time': { 'read_only': True },
        }
    #
    # de f create(self, validated_data):
    #     validated_data['user'] = self.context['request'].user
    # return MarketReservation.objects.create(**validated_data)