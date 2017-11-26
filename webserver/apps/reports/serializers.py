from rest_framework import serializers
from apps.users.models import User

from .models import Report
import re

class ReportSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    market = serializers.StringRelatedField()

    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'user', 'market')

