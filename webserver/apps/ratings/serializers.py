from rest_framework import serializers

from .models import Rating
import re

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('rating_score', 'time_stamp', 'rater_name', 'lessor')

    def validate_rater_name(self, data):
        if not re.match(r'^[A-Za-z0-9]+$', data):
            raise serializers.ValidationError('Rater name should be only number or letter')
        return data
        
