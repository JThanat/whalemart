from datetime import datetime

from rest_framework import serializers

from apps.rental_payment_info.models import RentalPaymentInfo, Installment


class InstallmentSerializer(serializers.ModelSerializer):
    PARTIAL = 1
    FULL = 2
    PAYMENT_TYPE_CHOICES = (
        (PARTIAL, 'Partial'),
        (FULL, 'Full')
    )
    payment_type = serializers.ChoiceField(choices=PAYMENT_TYPE_CHOICES, label='Payment Type', write_only=True)

    class Meta:
        model = Installment
        fields = ('id', 'payment_type', 'payment_method', 'round', 'payment_date', 'amount', 'credit_card',
                  'receipt_image', 'is_verified', 'rental_payment_info')

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
