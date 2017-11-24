from datetime import datetime

from rest_framework import serializers

from apps.reservations.models import Reservation
from apps.payments.models import RentalPaymentInfo, Installment
from apps.markets.models import Market
from apps.users.models import CreditCard
from apps.users.serializers import CreditCardSerializer


class InstallmentSerializer(serializers.ModelSerializer):
    market = serializers.PrimaryKeyRelatedField(many=False, queryset=Market.objects.all(), write_only=True,
                                                label='Market')
    credit_card = serializers.PrimaryKeyRelatedField(many=False, queryset=CreditCard.objects.all(), write_only=True,
                                                     label='Credit Card')
    new_credit_card = CreditCardSerializer(many=False, required=False)
    save_new_credit_card = serializers.BooleanField(default=False, label='Save new credit card')

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


class FirstInstallmentSerializer(InstallmentSerializer):
    PARTIAL = 1
    FULL = 2
    PAYMENT_TYPE_CHOICES = (
        (PARTIAL, 'Partial'),
        (FULL, 'Full')
    )
    payment_type = serializers.ChoiceField(choices=PAYMENT_TYPE_CHOICES, label='Payment Type', write_only=True)

    class Meta:
        model = Installment
        fields = ('id', 'payment_type', 'market', 'credit_card', 'new_credit_card', 'save_new_credit_card',
                  'payment_method', 'payment_date', 'amount', 'receipt_image', 'verification_status')
        extra_kwargs = {
            'verification_status': {'read_only': True}
        }

    def create(self, validated_data):
        # Create new Rental Payment Info
        payment_type = validated_data.pop('payment_type')
        market = validated_data.pop('market')
        user = self.context['request'].user
        reservation = Reservation.objects.filter(user=user, market=market)
        status = RentalPaymentInfo.DRAFTED
        if validated_data['payment_method'] == Installment.CREDIT_CARD:
            validated_data['verification_status'] = Installment.APPROVED
            if payment_type == self.PARTIAL:
                status = RentalPaymentInfo.DEPOSITED
            elif payment_type == self.FULL:
                status = RentalPaymentInfo.FULLY_PAID
        rental_payment_info = RentalPaymentInfo.objects.create(user=user, status=status,
                                                               reservation=reservation)
        # Create new credit card if user pay with new credit card
        new_credit_card = validated_data.pop('new_credit_card', None)
        save_new_credit_card = validated_data.pop('save_new_credit_card', False)
        _ = validated_data.pop('credit_card', None)
        new_credit_card['user'] = user
        if save_new_credit_card:
            CreditCard.object.create(**new_credit_card)
        # Create First Installment
        validated_data['round'] = 1
        validated_data['rental_payment_info'] = rental_payment_info
        return Installment.objects.create(**validated_data)


class SecondInstallmentSerializer(InstallmentSerializer):
    class Meta:
        model = Installment
        fields = ('id', 'market', 'credit_card', 'new_credit_card', 'save_new_credit_card',
                  'payment_method', 'payment_date', 'amount', 'receipt_image', 'verification_status')
        extra_kwargs = {
            'verification_status': {'read_only': True}
        }

    def create(self, validated_data):
        # Rental Payment Info
        market = validated_data.pop('market')
        user = self.context['request'].user
        reservation = Reservation.objects.get(user=user, market=market)
        rental_payment_info = RentalPaymentInfo.objects.get(user=user, reservation=reservation)
        if validated_data['payment_method'] == Installment.CREDIT_CARD:
            validated_data['verification_status'] = Installment.APPROVED
            validated_data['status'] = RentalPaymentInfo.FULLY_PAID
        # Create new credit card if user pay with new credit card
        new_credit_card = validated_data.pop('new_credit_card', None)
        save_new_credit_card = validated_data.pop('save_new_credit_card', False)
        _ = validated_data.pop('credit_card', None)
        new_credit_card['user'] = user
        if save_new_credit_card:
            CreditCard.object.create(**new_credit_card)
        # Create First Installment
        validated_data['round'] = 2
        validated_data['rental_payment_info'] = rental_payment_info
        return Installment.objects.create(**validated_data)


def pay_with_credit_card(self, **data):
    # TODO: Call service -- Boat-sama
    status = True
    message = 'Payment success'
    return status, message
