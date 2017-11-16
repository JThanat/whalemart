from datetime import time

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import filters

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
    """
    ### Search
    `/?search=<search_string>`: search with name or location
    ### Filter Params
    `min_price`, `max_price`: price range\n
    `morning`, `afternoon`, `evening`, `night`: true/false\n
    `min_date`, `max_date`: date range
    """
    serializer_class = MarketFeedSerializer
    queryset = Market.objects.all().order_by('-created_at')
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'location')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def filter_queryset(self, queryset):
        queryset = super(MarketFeedViewSet, self).filter_queryset(queryset)
        query_params = self.request.query_params
        min_price = query_params.get('min_price', None)
        max_price = query_params.get('max_price', None)
        # TODO: Wait for Aof-sama to define
        morning = query_params.get('morning', None)
        afternoon = query_params.get('afternoon', None)
        evening = query_params.get('evening', None)
        night = query_params.get('night', None)

        min_date = query_params.get('min_date', None)
        max_date = query_params.get('max_date', None)
        sort_by = query_params.get('sort_by', None)

        if min_price:
            queryset = queryset.exclude(max_price__lt=min_price)
        if max_price:
            queryset = queryset.exclude(min_price__gt=max_price)
        if min_date:
            queryset = queryset.exclude(closing_date__lt=min_date)
        if max_date:
            queryset = queryset.exclude(opening_date__gt=max_date)
        queryset = self.filter_part_of_the_day(
            queryset, morning, afternoon, evening, night)
        if sort_by:
            queryset = queryset.sort_by(sort_by)
        return queryset

    def filter_part_of_the_day(self, queryset, morning, afternoon, evening, night):
        # MORNING_START_TIME = time()
        return queryset