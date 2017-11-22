from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.decorators import api_view

from apps.payments.models import Installment
from apps.payments.serializers import FirstInstallmentSerializer


class FirstInstallmentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = FirstInstallmentSerializer()


@api_view(['GET',])
def get_payment_history(request, *args, **kwargs):
    pass