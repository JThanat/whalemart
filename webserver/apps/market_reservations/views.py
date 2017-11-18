from rest_framework import viewsets
from apps.market_reservations import MarketReservationSerializer


class MarketReservationViewSet(viewsets.ModelViewSet):
    queryset = Market.objects.all().order_by('-created_at')
    serializer_class = MarketReservationSerializer