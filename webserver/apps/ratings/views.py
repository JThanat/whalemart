from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets

from .serializers import RatingSerializer
from .models import Rating
from apps.markets.models import Market
from apps.lessors.models import Lessor

class RatingInfoViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

    def destroy(self, request, pk=None):
        lessor = get_object_or_404(Lessor, id=pk)
        rating = Rating.objects.filter(lessor=lessor)
        rating.delete()
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        lessor = get_object_or_404(Lessor, id=pk)
        rating = Rating.objects.filter(lessor=lessor)
        return Response(RatingSerializer(rating, many=True).data)


class RatingStarViewSet(viewsets.ViewSet):
    serializer_class = RatingSerializer

    def retrieve(self, request, pk=None):
        lessor = get_object_or_404(Lessor, id=pk)
        rating = Rating.objects.filter(lessor=lessor)
        rating_list = [0] * 5
        for r in rating:
            rating_list[r.rating_score-1] = rating_list[r.rating_score-1] + 1
        
        rating_dict = dict()
        for idx in range(5):
            rating_dict[str(idx+1)] = rating_list[idx]
        return Response(rating_dict)
