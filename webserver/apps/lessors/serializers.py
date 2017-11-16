from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

from .models import Lessor
import re

User = get_user_model()


class LessorEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = ('lessor_name',)


class LessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = '__all__'
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
        if (data is '') or re.match(r"^\+?\d{9,15}$", data):
            return data
        raise serializers.ValidationError('Phone number should be in format +123456789')

    def validate(self, data):
        if data['is_organization']:
            if data['organization_name'] is '':
                raise serializers.ValidationError('Organization name should not be empty')
            elif data['organization_contact_name'] is '':
                raise serializers.ValidationError('Organization contact name should not be empty')
            elif data['organization_email'] is '':
                raise serializers.ValidationError('Organization email should not be empty')
            elif data['organization_phone_number'] is '':
                raise serializers.ValidationError('Organization phone number should not be empty')

        return data


class LessorInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lessor
        fields = ('lessor_name', 'is_organization', 'organization_name', 'organization_contact_name',
                  'organization_email', 'organization_phone_number')
