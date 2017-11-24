from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets

from .serializers import RatingSerializer
from .models import Rating
from apps.lessors.models import Lessor

class RatingInfoViewSet(viewsets.ViewSet):
    """
    GET  `rating`: Display bank account information of active lessor
    POST `rating`: Add bank account to active lessor
    GET  `rating/{id}`: Get rating #id
    DELETE `rating/{id}`: Delete rating #id
    """
    serializer_class = RatingSerializer

    def create(self, request):
        data = request.data.copy()
        lessor = get_object_or_404(Lessor, pk=request.user.id)
        data['lessor'] = lessor.id
        serializer = RatingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, **kwargs):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        rating = Rating.objects.filter(lessor=lessor)
        return Response(RatingSerializer(rating, many=True).data)

    def destroy(self, request, pk=None):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        try:
            rating = Rating.objects.get(lessor=lessor, pk=pk)
            rating.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        try:
            rating = Rating.objects.get(lessor=lessor, pk=pk)
            return Response(RatingSerializer(rating).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
