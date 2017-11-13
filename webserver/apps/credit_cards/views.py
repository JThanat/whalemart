from rest_framework import viewsets

from .serializers import CreditCardSerializer
from .models import CreditCard


class CreditCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint of credit card
    """
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
