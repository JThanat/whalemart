from rest_framework import serializers
from apps.users.models import User
from apps.markets.models import Market

from .models import Report


class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'market', 'reported_user')

    def create(self, validated_data):
        validated_data['user'] = self.context.get('request').user
        report = Report.objects.create(**validated_data)
        return report

    def to_representation(self, instance):
        repr = super(ReportSerializer, self).to_representation(instance)
        repr['market'] = str(Market.objects.get(pk=repr['market']))
        repr['reported_user'] = str(User.objects.get(pk=repr['reported_user']))
        return repr