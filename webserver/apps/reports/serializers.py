from rest_framework import serializers
from apps.users.models import User
from apps.markets.models import Market

from .models import Report
import re

class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'user', 'market')

    def to_representation(self, instance):
        repr = super(ReportSerializer, self).to_representation(instance)
        repr['market'] = str(Market.objects.get(pk=repr['market']))
        repr['user'] = str(User.objects.get(pk=repr['user']))
        return repr