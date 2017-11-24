from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.payments.models import Installment
from apps.payments.serializers import FirstInstallmentSerializer


class FirstInstallmentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = FirstInstallmentSerializer()
