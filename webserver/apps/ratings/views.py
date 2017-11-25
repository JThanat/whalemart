from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets

from .serializers import RatingSerializer
from .models import Rating
from apps.markets.models import Market
from apps.users.models import User

class RatingInfoViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

    def create(self, request, format=None):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = RatingSerializer(data=data, context=self.get_serializer_context())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        rating = Rating.objects.filter(market=market)
        rating.delete()
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        rating = Rating.objects.filter(market=market)
        return Response(RatingSerializer(rating, many=True).data)


class RatingStarViewSet(viewsets.ViewSet):
    serializer_class = RatingSerializer

    def retrieve(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        rating = Rating.objects.filter(market=market)
        rating_list = [0] * 5
        for r in rating:
            rating_list[r.rating_score-1] = rating_list[r.rating_score-1] + 1
        
        rating_dict = dict()
        for idx in range(5):
            rating_dict[str(idx+1)] = rating_list[idx]
        return Response(rating_dict)
