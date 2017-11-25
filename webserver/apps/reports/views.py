from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets

from .serializers import ReportSerializer
from .models import Report
from apps.markets.models import Market
from apps.users.models import User

class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def create(self, request, format=None):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ReportSerializer(data=data, context=self.get_serializer_context())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        report = Report.objects.filter(market=market)
        report.delete()
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        report = Report.objects.filter(market=market)
        return Response(ReportSerializer(report, many=True).data)
