from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes

from apps.payments.models import Installment, RentalPaymentInfo
from apps.markets.models import Market
from apps.booths.models import Booth
from apps.payments.serializers import InstallmentSerializer, UploadReceiptSerializer, VerifyReceiptSerializer


class PaymentViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """
    ### Pay with bank account
    {\n
        "payment_type": 1,
        "market": 1,
        "payment_method": 2,
        "amount": 2000
    }
    ### Pay with credit card
    {\n
        "payment_type": 1,
        "market": 1,
        "payment_method": 1,
        "amount": 2000,
        "credit_card": 1
    }
    ### Pay with new credit card
    {\n
        "payment_type": 1,
        "market": 1,
        "new_credit_card": {
            "card_number": "123456789",
            "card_holder_name": "Bee",
            "type": 1,
            "expiry_date": "2020-07-01",
            "verification_no": "123"
        },
        "save_new_credit_card": true,
        "payment_method": 1,
        "amount": 2000
    }
    """
    queryset = Installment.objects.all()
    serializer_class = InstallmentSerializer
    permission_classes = (IsAuthenticated,)


class UploadReceiptViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = Installment.objects.all()
    serializer_class = UploadReceiptSerializer
    permission_classes = (IsAuthenticated,)


class VerifyReceiptViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin):
    queryset = Installment.objects.filter(payment_method=Installment.BANK_TRANSFER,
                                          verification_status=Installment.PENDING)
    serializer_class = VerifyReceiptSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)


@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def get_payment_status(request, *args, **kwargs):
    market_id = kwargs.get('pk', None)
    market = Market.objects.filter(pk=market_id)
    if len(market) == 0:
        return Response('Market does not exist', status=status.HTTP_400_BAD_REQUEST)
    booths = Booth.objects.filter(market=market)
    response = []
    for booth in booths:
        payment_info = dict()
        payment_info['booth_id'] = booth.pk
        payment_info['booth_number'] = booth.booth_number
        approved_reservations = booth.approved_reservations.all()
        if len(approved_reservations) != 0:
            approved_reservation = approved_reservations[0]
        try:
            rental_payment_info = approved_reservation.rental_payment_info
            payment_info['payment_status'] = rental_payment_info.status
            payment_info['vendor_id'] = rental_payment_info.user.id
            payment_info['vendor_name'] = rental_payment_info.user.first_name + ' ' + rental_payment_info.user.last_name
        except:
            payment_info['payment_status'] = 0
            payment_info['vendor_id'] = None
            payment_info['vendor_name'] = None
        response.append(payment_info)
    return Response(response, status=status.HTTP_200_OK)
