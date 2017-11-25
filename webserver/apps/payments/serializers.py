from django.forms.models import model_to_dict
from rest_framework import serializers

from apps.reservations.models import Reservation
from apps.payments.models import RentalPaymentInfo, Installment
from apps.markets.models import Market
from apps.users.models import CreditCard
from apps.users.serializers import CreditCardSerializer


class UploadReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = ('payment_date', 'amount', 'verification_status', 'receipt_image',)
        read_only_fields = ('amount', 'verification_status')


class InstallmentSerializer(serializers.ModelSerializer):
    PARTIAL = 1
    FULL = 2
    PAYMENT_TYPE_CHOICES = (
        (PARTIAL, 'Partial'),
        (FULL, 'Full')
    )
    payment_type = serializers.ChoiceField(choices=PAYMENT_TYPE_CHOICES, label='Payment Type', write_only=True)

    market = serializers.PrimaryKeyRelatedField(many=False, queryset=Market.objects.all(), write_only=True,
                                                label='Market')
    credit_card = serializers.PrimaryKeyRelatedField(many=False, queryset=CreditCard.objects.all(), write_only=True,
                                                     label='Credit Card', required=False, allow_null=True)
    new_credit_card = CreditCardSerializer(many=False, required=False, allow_null=True)
    save_new_credit_card = serializers.BooleanField(default=False, label='Save new credit card')

    class Meta:
        model = Installment
        fields = ('payment_type', 'market', 'credit_card', 'new_credit_card', 'save_new_credit_card',
                  'payment_method', 'payment_date', 'amount', 'verification_status')
        extra_kwargs = {
            'verification_status': {'read_only': True}
        }

    def validate_new_credit_card(self, card_info):
        if card_info:
            success, message = pay_with_credit_card(**card_info)
            if not success:
                raise serializers.ValidationError(message)
        return card_info

    def validate_credit_card(self, credit_card):
        if credit_card:
            card_info = model_to_dict(credit_card)
            success, message = pay_with_credit_card(**card_info)
            if not success:
                raise serializers.ValidationError(message)
        return credit_card

    def create(self, validated_data):
        # Get reservation object
        market = validated_data.pop('market', None)
        user = self.context['request'].user
        reservation = Reservation.objects.get(user=user, market=market)
        payment_type = validated_data.pop('payment_type', None)

        # Create new credit card if user pay with new credit card
        new_credit_card = validated_data.pop('new_credit_card', None)
        save_new_credit_card = validated_data.pop('save_new_credit_card', False)
        _ = validated_data.pop('credit_card', None)
        if save_new_credit_card:
            new_credit_card['user'] = user
            CreditCard.objects.create(**new_credit_card)

        # If user have already paid partially
        if RentalPaymentInfo.objects.filter(user=user, reservation=reservation).exists():
            # Get rental payment info
            rental_payment_info = RentalPaymentInfo.objects.get(user=user, reservation=reservation)
            if validated_data['payment_method'] == Installment.CREDIT_CARD:
                validated_data['verification_status'] = Installment.APPROVED
                rental_payment_info.status = RentalPaymentInfo.FULLY_PAID
                rental_payment_info.save()
            validated_data['round'] = 2
        else:
            # Create new Rental Payment Info
            status = RentalPaymentInfo.DRAFTED
            if validated_data['payment_method'] == Installment.CREDIT_CARD:
                validated_data['verification_status'] = Installment.APPROVED
                if payment_type == self.PARTIAL:
                    status = RentalPaymentInfo.DEPOSITED
                elif payment_type == self.FULL:
                    status = RentalPaymentInfo.FULLY_PAID
            rental_payment_info = RentalPaymentInfo.objects.create(user=user, status=status,
                                                                   reservation=reservation)
            validated_data['round'] = 1

        # Create new installment
        validated_data['rental_payment_info'] = rental_payment_info
        return Installment.objects.create(**validated_data)


def pay_with_credit_card(**data):
    # TODO: Call service -- Boat-sama
    status = True
    message = 'Payment success'
    return status, message
