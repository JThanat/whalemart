from rest_framework import viewsets
from apps.market_reservations.models import MarketReservation
from apps.market_reservations.serializer import MarketReservationSerializer


class MarketReservationViewSet(viewsets.ModelViewSet):
    queryset = MarketReservation.objects.all()
    serializer_class = MarketReservationSerializer
