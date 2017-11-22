from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from apps.payments.models import Installment


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
