from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from apps.payments.models import Installment, RentalPaymentInfo
from apps.payments.serializers import InstallmentSerializer


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
