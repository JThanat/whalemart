from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import list_route

from apps.lessors.serializers import LessorSerializer, LessorEditSerializer
from .models import Lessor

User = get_user_model()


class BecomeALessorViewSet(viewsets.GenericViewSet):
    """
    Become a lessor api
    """
    serializer_class = LessorSerializer

    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = LessorSerializer(data=data, context=self.get_serializer_context())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LessorViewSet(viewsets.ViewSet):
    """
    Display infomation of lessor

    * GET `lessor` - Get lessor information
    * POST `lessor/change` - Update lessor information
    """
    serializer_class = LessorEditSerializer

    def list(self, request):
        user = get_object_or_404(User, id=request.user.id)
        lessor = get_object_or_404(Lessor, user=user)
        return Response(LessorSerializer(lessor).data)

    @list_route(methods=['post'])
    def change(self, request):
        user = get_object_or_404(User, id=request.user.id)
        lessor = get_object_or_404(Lessor, user=user)
        serializer = LessorEditSerializer(lessor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
