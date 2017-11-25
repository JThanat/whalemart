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
    """
    GET  `report`: Display bank account information of active lessor
    POST `report`: Add bank account to active lessor
    GET  `report/{id}`: Get report #id
    DELETE `report/{id}`: Delete report #id
    """
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def destroy(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        report = Report.objects.filter(market=market)
        report.delete()
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        market = get_object_or_404(Market, id=pk)
        report = Report.objects.filter(market=market)
        return Response(ReportSerializer(report, many=True).data)
