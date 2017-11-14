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
        query_params = self.request.query_params
        min_price = query_params.get('min-price', None)
        max_price = query_params.get('max-price', None)
        opening_time = query_params.get('opening-time', None)
        min_opening_date = query_params.get('min-opening-date', None)
        max_opening_date = query_params.get('max-opening-date', None)
        sort_by = query_params.get('sort-by', None)

        if min_price:
            queryset = queryset.exclude(max_price_lt=min_price)
        if max_price:
            queryset = queryset.exclude(min_price_gt=max_price)
        if min_opening_date:
            queryset = queryset.exclude(closing_date_lt=min_opening_date)
        if max_opening_date:
            queryset = queryset.exclude(opening_date_gt=max_opening_date)
        if sort_by:
            queryset = queryset.sort_by(sort_by)
        # if date:
        #     if not product or not master_contract:
        #         raise serializers.ValidationError(_('Please provide product and master_contract'))
        #     queryset = queryset.filter(start_date__lte=date).order_by('-start_date')
        #     if len(queryset) != 0:
        #         queryset = [queryset[0],]
        return queryset
