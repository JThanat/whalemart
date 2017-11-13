from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets

from .serializers import BankAccountSerializer
from .models import BankAccount
from apps.lessors.models import Lessor

class BankAccountInfoViewSet(viewsets.ViewSet):
    """
    GET: Display bank account information of active lessor
    POST: Add bank account to active lessor
    """

    def create(self, request):
        data = request.data
        lessor = get_object_or_404(Lessor, pk=request.user.id)
        data['lessor'] = lessor.id
        serializer = BankAccountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, **kwargs):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        bank_accounts = BankAccount.objects.filter(lessor=lessor)
        return Response(BankAccountSerializer(bank_accounts, many=True).data)
