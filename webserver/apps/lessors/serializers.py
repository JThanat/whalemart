from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

from .models import Lessor
import re

User = get_user_model()

class LessorEditSerializaer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = ('lessor_name',)

class LessorSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=0) 
    
    class Meta:
        model = Lessor
        fields = ('lessor_name', 'user', 'is_organization', 'organization_name', 'organization_contact_name', 'organization_email', 'organization_phone_number')
        extra_kwargs = {
            'organization_name': {'required': False},
            'organization_contact_name': {'required': False},
            'organization_email': {'required': False},
            'organization_phone_number': {'required': False}
        }

    def create(self, validated_data):
        return Lessor.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.lessor_name = validated_data.get('lessor_name', instance.lessor_name)
        instance.save()
        return instance

    def validate_organization_phone_number(self, data):
        if (data is None) or re.match(r"^\+?\d{9,15}$", data):
            return data
        raise serializers.ValidationError('Phone number should be in format +123456789')

    def validate(self, data):
        print(data)
        try:
            Lessor.objects.get(user=data['user'])
        except ObjectDoesNotExist:
            raise serializers.ValidationError('This user already registered as lessor')

        if data['is_organization'] == True:
            if data['organization_name'] is None:
                raise serializers.ValidationError('Organization name should not be empty')
            elif data['organization_contact_name'] is None:
                raise serializers.ValidationError('Organization contact name should not be empty')
            elif data['organization_email'] is None:
                raise serializers.ValidationError('Organization email should not be empty')
            elif data['organization_phone_number'] is None:
                raise serializers.ValidationError('Organization phone number should not be empty')
        return data
