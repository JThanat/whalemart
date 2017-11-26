from rest_framework import serializers
from apps.users.models import User

from .models import Report
import re

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'user', 'market')

    def to_representation(self, instance):
        repr = super(ReportSerializer, self).to_representation(instance)
        repr['username'] = str(User.objects.get(pk=repr['user']))
        return repr
