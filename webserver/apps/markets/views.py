from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.settings import api_settings

from apps.markets.models import Market
from apps.markets.serializers import MarketSerializer, MarketFeedSerializer


#
# class MarketViewSet(viewsets.ViewSet):
#     """
#     A ViewSet for listing market
#     """
#     # queryset = Market.objects.all().order_by('-created_at')
#     # serializer_class = MarketFeedSerializer
#     def list(self, request):
#         queryset = Market.objects.all()
#         serializer = MarketFeedSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         queryset = Market.objects.all()
#         market = get_object_or_404(queryset, pk=pk)
#         serializer = MarketSerializer(market)
#         return Response(serializer.data)
#
#     def create(self, request):
#         serializers = MarketSerializer


class MarketViewSet(viewsets.ModelViewSet):
    queryset = Market.objects.all().order_by('-created_at')
    serializer_class = MarketSerializer


class MarketFeedViewSet(viewsets.GenericViewSet):
    serializer_class = MarketFeedSerializer
    queryset = Market.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)