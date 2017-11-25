from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from apps.payments.models import Installment, RentalPaymentInfo
from apps.payments.serializers import InstallmentSerializer


class PaymentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = InstallmentSerializer
    permission_classes = (IsAuthenticated,)
