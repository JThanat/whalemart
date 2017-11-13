from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.response import Response

from apps.markets.models import Market
from apps.markets.serializers import MarketSerializer, MarketFeedSerializer


class MarketViewSet(viewsets.ViewSet):
    """
    A ViewSet for listing market
    """
    def list(self, request):
        queryset = Market.objects.all()
        serializer = MarketFeedSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):

        queryset = Market.objects.all()
        market = get_object_or_404(queryset, pk=pk)
        serializer = MarketSerializer(market)
        return Response(serializer.data)

