from datetime import datetime

from rest_framework import serializers

from apps.reservations.models import Reservation
from apps.payments.models import RentalPaymentInfo, Installment
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
    reservation_info = serializers.PrimaryKeyRelatedField(many=False, queryset=Reservation.objects.all(),
                                                          write_only=True, label='Reservation Info')
    new_credit_card = CreditCardSerializer(many=False, required=False)

    class Meta:
        model = Installment
        fields = ('id', 'payment_type', 'reservation_info', 'new_credit_card', 'payment_method', 'payment_date',
                  'amount', 'credit_card', 'receipt_image', 'verification_status')
        extra_kwargs = {
            'verification_status': {'read_only': True}
        }

    def validate_new_credit_card(self, card_info):
        success, message = pay_with_credit_card(**card_info)
        if not success:
            raise serializers.ValidationError(message)
        return card_info

    def validate_credit_card(self, pk):
        card_info = CreditCard.object.get(id=pk)
        success, message = pay_with_credit_card(**card_info)
        if not success:
            raise serializers.ValidationError(message)
        return card_info

    def create(self, validated_data):
        # Create new Rental Payment Info
        payment_type = validated_data.pop('payment_type')
        reservation_info = validated_data.pop('reservation_info')
        user = self.context['request'].user
        status = RentalPaymentInfo.DRAFTED
        if validated_data['payment_method'] == Installment.CREDIT_CARD:
            validated_data['verification_status'] = Installment.APPROVED
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


def pay_with_credit_card(self, **data):
    # TODO: Call service -- Boat-sama
    status = True
    message = 'Payment success'
    return status, message
