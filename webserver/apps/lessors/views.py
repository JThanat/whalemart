from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets

from apps.lessors.serializers import LessorSerializer, LessorWithoutUserSerializer
from .models import Lessor

User = get_user_model()

class BecomeALessorViewSet(viewsets.ViewSet):
    """
    Become a lessor api
    """
    serializer_class = LessorWithoutUserSerializer

    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = LessorSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class LessorInfoViewSet(viewsets.ViewSet):
    """
    Display infomation of lessor
    """

    def list(self, request, **kwargs):
        user = get_object_or_404(User, id = request.user.id)
        lessor = get_object_or_404(Lessor, user = user)
        return Response(LessorSerializer(lessor).data)
