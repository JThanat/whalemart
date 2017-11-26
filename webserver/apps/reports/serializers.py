from rest_framework import serializers

from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('report_content', 'time_stamp', 'market')

    def create(self, validated_data):
        validated_data['user'] = self.context.get('request').user
        report = Report.objects.create(**validated_data)
        return report
