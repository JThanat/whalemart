from rest_framework import serializers

from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'user', 'market')
        extra_kwargs = {
            'user': {'required': False},
        }
