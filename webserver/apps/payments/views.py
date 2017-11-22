from django.shortcuts import render
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.payments.models import Installment
from apps.payments.serializers import FirstInstallmentSerializer


class FirstInstallmentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = FirstInstallmentSerializer()


@api_view(['GET',])
def get_payment_history(request, *args, **kwargs):
    pass


@api_view(['GET',])
def get_unverified_receipt(request, *args, **kwargs):
    installments = Installment.objects.filter(payment_method=Installment.BANK_TRANSFER, is_verified=False)
    response = []
    for installment in installments:
        obj = dict()
        obj['id'] = installment.id
        obj['payment_date'] = installment.payment_date
        obj['amount'] = installment.amount
        obj['receipt_image'] = installment.receipt_image
        response.append(obj)
    return Response(response, status=status.HTTP_200_OK)
