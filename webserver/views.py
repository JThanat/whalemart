from django.utils.translation import ugettext_lazy as _

from rest_framework import filters
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets


class MarketViewSet(viewsets.ModelViewSet):
    """
        ### *Urls*\n
        query_params = min-price, max-price, opening-time, min-opening-date, max-opening-date, sort-by
    """

    queryset = PurchasingPrice.objects.all().order_by('-updated_at')
    serializer_class = PurchasingPriceSerializer
    permission_classes = (IsAuthenticated, PurchasingPriceAccess)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'location')

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
