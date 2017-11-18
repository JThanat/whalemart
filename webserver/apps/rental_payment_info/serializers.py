from datetime import datetime

from rest_framework import serializers

from apps.market_reservations.models import MarketReservation
from apps.rental_payment_info.models import RentalPaymentInfo, Installment
from apps.users.models import CreditCard
from apps.users.serializers import CreditCardSerializer


class FirstInstallmentSerializer(serializers.ModelSerializer):
    PARTIAL = 1
    FULL = 2
    PAYMENT_TYPE_CHOICES = (
        (PARTIAL, 'Partial'),
        (FULL, 'Full')
    )
    payment_type = serializers.ChoiceField(choices=PAYMENT_TYPE_CHOICES, label='Payment Type', write_only=True)
    reservation_info = serializers.PrimaryKeyRelatedField(many=False, queryset=MarketReservation.objects.all(),
                                                          write_only=True, label='Reservation Info')
    new_credit_card = CreditCardSerializer(many=False, required=False)

    class Meta:
        model = Installment
        fields = ('id', 'payment_type', 'reservation_info', 'new_credit_card', 'payment_method', 'payment_date',
                  'amount', 'credit_card', 'receipt_image', 'is_verified')
        extra_kwargs = {
            'is_verified': {'read_only': True}
        }

    def create(self, validated_data):
        # Create new Rental Payment Info
        payment_type = validated_data.pop('payment_type')
        reservation_info = validated_data.pop('reservation_info')
        user = self.context['request'].user
        is_verified = validated_data.pop('is_verified')
        status = RentalPaymentInfo.DRAFTED
        if is_verified:
            if payment_type == self.PARTIAL:
                status = RentalPaymentInfo.DEPOSITED
            elif payment_type == self.FULL:
                status = RentalPaymentInfo.FULLY_PAID
        rental_payment_info = RentalPaymentInfo.objects.create(user=user, status=status,
                                                               reservation_info=reservation_info)
        # Create new credit card if user pay with new credit card
        new_credit_card = validated_data.pop('new_credit_card')
        new_credit_card['user'] = user
        validated_data['credit_card'] = CreditCard.object.create(**new_credit_card)
        # Create First Installment
        validated_data['round'] = 1
        validated_data['rental_payment_info'] = rental_payment_info
        return Installment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        pass
