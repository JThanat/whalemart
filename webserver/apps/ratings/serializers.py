from rest_framework import serializers

from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('rating_score', 'time_stamp', 'lessor', 'market')

    def create(self, validated_data):
        validated_data['user'] = self.context.get('request').user
        rating = Rating.objects.create(**validated_data)
        return rating

    def validate_rating_score(self, data):
        if data < 1 or data > 5:
            raise serializers.ValidationError('Rating should be an integer between 1 to 5')
        return data
