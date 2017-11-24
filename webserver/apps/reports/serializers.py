from rest_framework import serializers

from .models import Report
import re

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'lessor', 'user')
