from rest_framework import serializers

from apps.commons.choices import ReservationStatus
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
        fields = ('id', 'shop_name', 'reservation_time', 'market', 'reserved_booths', 'approved_booth', 'products')
        extra_kwargs = {
            'id': {'read_only': True},
            'status': {'read_only': True},
            'reservation_time': {'read_only': True},
            'approved_booth': {'read_only': True},
        }

    def validate(self, data):
        user = self.context['request'].user
        if Reservation.objects.filter(market=data['market'], user=user).exists():
            raise serializers.ValidationError('This user have already reserve this market')
        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        reserved_booths = validated_data.pop('reserved_booths', None)
        reservation = super(ReservationSerializer, self).create(validated_data)
        # reservation = Reservation.objects.create(**validated_data)
        for reserved_booth in reserved_booths:
            ReservedBooth.objects.create(reservation=reservation, booth=reserved_booth['booth'],
                                         status=ReservationStatus.PENDING)
        return reservation
