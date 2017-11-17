from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import BoothSerializer
from apps.markets.models import Market
from .models import Booth


class BoothViewSet(viewsets.ViewSet):
    """
    Set booth information
    """
    serializer_class = BoothSerializer

    def retrieve(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        booths = Booth.objects.filter(market=market)
        return Response(BoothSerializer(booths, many=True).data)

    def destroy(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        booths = Booth.objects.filter(market=market)
        booths.delete()
        return Response(status=status.HTTP_200_OK)