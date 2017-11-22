from rest_framework import serializers
from .models import Reservation, ReservedBooth


class ReservedBoothSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedBooth
        fields = ('id', 'status', 'booth')
        extra_kwargs = {
            'id': {'read_only': True},
            'status': {'read_only': True},
        }


class ReservationSerializer(serializers.ModelSerializer):
    reserved_booths = ReservedBoothSerializer(many=True)

    class Meta:
        model = Reservation
        fields = ('id', 'shop_name', 'reservation_time', 'status', 'market')
        extra_kwargs = {
            'id': {'read_only': True},
            'status': {'read_only': True},
            'reservation_time': {'read_only': True},
        }

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        reserved_booths = validated_data.pop('booths', None)
        reservation = Reservation.objects.create(**validated_data)
        for booth in reserved_booths:
            ReservedBooth.objects.create(reservation=reservation, booth=booth, status=ReservedBooth.PENDING)
        return reservation
