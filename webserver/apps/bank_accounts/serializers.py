from rest_framework import serializers

from .models import BankAccount
import re

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ('account_name', 'account_id', 'bank', 'branch', 'lessor')

    def validate_account_id(self, data):
        if not re.match(r'^[0-9]+$', data):
            raise serializers.ValidationError('Account id should be all number')
        if len(data) < 10:
            raise serializers.ValidationError('Account id should contains atleast 10 characters')
        return data
    
    def validate_bank(self, data):
        if not re.match(r'^[A-Z]+$', data):
            raise serializers.ValidationError('Bank should contains only capital letter')
        return data
        
    