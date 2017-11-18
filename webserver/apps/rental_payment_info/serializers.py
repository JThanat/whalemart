from datetime import datetime

from rest_framework import serializers

from apps.rental_payment_info.models import RentalPaymentInfo, Installment


class InstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = ('id', 'payment_method', 'round', 'payment_date', 'amount', 'credit_card', 'receipt_image',
                  'is_verified', 'rental_payment_info')

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
