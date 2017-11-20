from datetime import datetime

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.response import Response

from apps.commons.parser import MultipartFormencodeParser
from apps.markets.models import Market, Scene
from apps.markets.serializers import MarketSerializer, MarketFeedSerializer, SceneSerializer


class MarketViewSet(viewsets.ModelViewSet):
    queryset = Market.objects.all().order_by('-created_at')
    serializer_class = MarketSerializer
    parser_classes = (JSONParser, FormParser, MultipartFormencodeParser)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super(MarketViewSet, self).update(request, *args, **kwargs)


class MarketFeedViewSet(viewsets.GenericViewSet):
    """
    ### Search
    `search`: search with name or location
    ### Filter Params
    `min_price`, `max_price`: decimal\n
    `morning`, `afternoon`, `evening`, `night`: true/false\n
    `min_date`, `max_date`: date\n
    ### Sort
    `sort_by`: created_time, opening_date
    """
    serializer_class = MarketFeedSerializer
    queryset = Market.objects.all().order_by('-created_at')
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'location')
    paginate_by = 12

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
        filtered_queryset = queryset
        filtered_queryset = self.filter_part_of_the_day(
            filtered_queryset, morning, afternoon, evening, night)
        if sort_by:
            filtered_queryset = filtered_queryset.order_by(sort_by)
        return filtered_queryset

    def filter_part_of_the_day(self, queryset, morning, afternoon, evening, night):
        MORNING_START_TIME = '2017-01-01 4:00:00'
        MORNING_END_TIME = '2017-01-01 12:00:00'
        AFTERNOON_START_TIME = '2017-01-01 12:00:00'
        AFTERNOON_END_TIME = '2017-01-01 18:00:00'
        EVENING_START_TIME = '2017-01-01 15:30:00'
        EVENING_END_TIME = '2017-01-01 21:00:00'
        NIGHT_START_TIME = '2017-01-01 18:00:00'
        NIGHT_END_TIME = '2017-01-02 4:00:00'

        morning_markets = Market.objects.none()
        afternoon_markets = Market.objects.none()
        evening_markets = Market.objects.none()
        night_markets = Market.objects.none()

        if not (morning or afternoon or evening or night):
            return queryset

        if morning:
            morning_markets = Market.objects.raw_as_qs(self.make_sql_query(MORNING_START_TIME, MORNING_END_TIME))
        if afternoon:
            afternoon_markets = Market.objects.raw_as_qs(self.make_sql_query(AFTERNOON_START_TIME, AFTERNOON_END_TIME))
        if evening:
            evening_markets = Market.objects.raw_as_qs(self.make_sql_query(EVENING_START_TIME, EVENING_END_TIME))
        if night:
            night_markets = Market.objects.raw_as_qs(self.make_sql_query(NIGHT_START_TIME, NIGHT_END_TIME))
        return morning_markets.union(afternoon_markets, evening_markets, night_markets).intersection(queryset)

    def make_sql_query(self, start_time, end_time):
        time_interval = str(self.get_time_interval(start_time, end_time))
        percent_overlap = '0.5'
        query_string = ""\
            "select * from ( "\
                "select *, "\
                    "cast('2017-01-01' as timestamp) + opening_time as new_opening_time, "\
                        "cast(case "\
                            "when closing_time < opening_time "\
                                "then cast('2017-01-01' as timestamp) + closing_time + INTERVAL '1 day' "\
                                "else cast('2017-01-01' as timestamp) + closing_time "\
                            "end AS timestamp) as new_closing_time "\
                "from public.markets_market) as MarketTable "\
            "where (not new_opening_time >= '" + end_time + "' and not new_closing_time <= '" + start_time + "') "\
                "and ( "\
                    "(new_opening_time >= '" + start_time + "' and new_closing_time <= '" + end_time + "') or "\
                    "(new_opening_time <= '" + start_time + "' and new_closing_time >= '" + end_time + "') or "\
                    "(new_opening_time <= '" + start_time + "' and new_closing_time <= '" + end_time + "' and "\
                        "new_closing_time - '" + start_time + "' >= " + \
                            percent_overlap + " * (interval '" + time_interval + " minute')) or "\
                    "(new_opening_time >= '" + start_time + "' and new_closing_time >= '" + end_time + "' and  "\
                        "'2017-01-01 12:00:00' - new_opening_time >= " + \
                            percent_overlap + " * (interval '" + time_interval + " minute')))"
        return query_string

    def get_time_interval(self, start_time, end_time):
        start = datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
        end = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
        diff = end - start
        return diff.seconds // 60


class SceneViewSet(viewsets.ModelViewSet):
    queryset = Scene.objects.all().order_by('-id')
    serializer_class = SceneSerializer
