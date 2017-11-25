from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from apps.payments.models import Installment, RentalPaymentInfo


@api_view(['GET', 'POST'])
def verify_receipt(request, *args, **kwargs):
    if request.method == 'GET':
        installments = Installment.objects.filter(payment_method=Installment.BANK_TRANSFER)
        response = []
        for installment in installments:
            obj = dict()
            obj['id'] = installment.id
            obj['payment_date'] = installment.payment_date
            obj['amount'] = installment.amount
            obj['receipt_image'] = installment.receipt_image
            obj['verification_status'] = installment.verification_status
            response.append(obj)
        return Response(response, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        installment_id = request.data.get('id', None)
        installment = Installment.objects.get(id=installment_id)
        verification_status = request.data.get('verification_status', None)
        installment.verification_status = verification_status
        rental_payment_info = installment.rental_payment_info
        if installment.round == 2:
            rental_payment_info.status = RentalPaymentInfo.FULLY_PAID
        else:
            rental_payment_info.status = RentalPaymentInfo.DEPOSITED
        installment.save()
        rental_payment_info.save()
        return Response({'is_success': True}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
