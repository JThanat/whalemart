from django.shortcuts import render
from rest_framework import viewsets, mixins

from apps.payments.models import Installment
from apps.payments.serializers import FirstInstallmentSerializer


class FirstInstallmentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = FirstInstallmentSerializer()
