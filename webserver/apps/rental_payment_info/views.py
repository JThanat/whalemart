from django.shortcuts import render
from rest_framework import viewsets, mixins

from apps.rental_payment_info.models import Installment
from apps.rental_payment_info.serializers import FirstInstallmentSerializer


class FirstInstallmentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = FirstInstallmentSerializer()
