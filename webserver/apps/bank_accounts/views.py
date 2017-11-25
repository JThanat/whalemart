from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets

from .serializers import BankAccountSerializer
from .models import BankAccount
from apps.lessors.models import Lessor

class BankAccountInfoViewSet(viewsets.ViewSet):
    """
    GET  `bank-account`: Display bank account information of active lessor\n
    POST `bank-account`: Add bank account to active lessor\n
    GET  `bank-account/{id}`: Get bank account #id\n
    DELETE `bank-account/{id}`: Delete bank account #id
    """
    serializer_class = BankAccountSerializer

    def create(self, request):
        data = request.data.copy()
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

    def destroy(self, request, pk=None):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        try:
            bank_account = BankAccount.objects.get(lessor=lessor, pk=pk)
            bank_account.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        lessor = get_object_or_404(Lessor, user=request.user.id)
        try:
            bank_account = BankAccount.objects.get(lessor=lessor, pk=pk)
            return Response(BankAccountSerializer(bank_account).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

