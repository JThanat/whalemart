from rest_framework import serializers

from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('rating_score', 'time_stamp', 'user', 'market')
        extra_kwargs = {
            'user': {'required': False},
        }

    def validate_rating_score(self, data):
        if data < 1 or data > 5:
            raise serializers.ValidationError('Rating should be an integer between 1 to 5')
        return data
