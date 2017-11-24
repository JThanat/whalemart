from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets

from .serializers import ReportSerializer
from .models import Report
from apps.lessors.models import Lessor
from apps.users.models import User

class ReportInfoViewSet(viewsets.ViewSet):
    """
    GET  `report`: Display bank account information of active lessor
    POST `report`: Add bank account to active lessor
    GET  `report/{id}`: Get report #id
    DELETE `report/{id}`: Delete report #id
    """
    serializer_class = ReportSerializer

    def create(self, request):
        data = request.data.copy()
        lessor = get_object_or_404(Lessor, pk=request.user.id)
        data['lessor'] = lessor.id
        serializer = ReportSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, **kwargs):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        report = Report.objects.filter(lessor=lessor)
        return Response(ReportSerializer(report, many=True).data)

    def destroy(self, request, pk=None):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        try:
            report = Report.objects.get(lessor=lessor, pk=pk)
            report.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        try:
            report = Report.objects.get(lessor=lessor, pk=pk)
            return Response(ReportSerializer(report).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
