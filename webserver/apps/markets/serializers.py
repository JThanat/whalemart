import re

from rest_framework import serializers

from apps.markets.models import Market, CoverPhoto, Scene
from apps.tags.models import Tag
from apps.booths.models import Booth
from apps.tags.serializers import TagSerializer


class CoverPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverPhoto
        fields = ('image',)


class CoverPhotoThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverPhoto
        fields = ('thumbnail',)


class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = ('scene_image',)


class BoothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booth
        fields = ('booth_number', 'rental_fee')

    def validate_booth_number(self, data):
        if not re.match(r'^[A-Za-z0-9]+$', data):
            raise serializers.ValidationError(
                'Booth number should be only number or letter')
        return data


class MarketSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    cover_photo = CoverPhotoSerializer()
    scene_photos = SceneSerializer(many=True)
    booths = BoothSerializer(many=True)

    class Meta:
        model = Market
        fields = ('name', 'caption', 'description', 'opening_date', 'closing_date', 'opening_time', 'closing_time',
                  'contact_person_fullname', 'contact_person_phone_number', 'contact_person_email', 'location',
                  'location_latitude', 'location_longitude', 'term_and_condition', 'deposit_payment_due',
                  'full_payment_due', 'reservation_due_date', 'estimate_visitor', 'min_price', 'max_price',
                  'layout_photo', 'provided_accessories', 'cover_photo', 'scene_photos', 'tags')

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        cover_photo = validated_data.pop('cover_photo')
        scene_photos = validated_data.pop('scene_photos')
        booths = validated_data.pop('booths')

        validated_data['created_user'] = self.context.get('request').user
        validated_data['updated_user'] = self.context.get('request').user

        market = Market.objects.create(**validated_data)

        CoverPhoto.objects.create(market=market, **cover_photo)

        for tag in tags_data:
            Tag.objects.create(market=market, **tag)

        for scene_photo in scene_photos:
            Scene.objects.create(market=market, **scene_photo)

        for booth in booths:
            Booth.objects.create(market=market, **booth)

        return market


class MarketFeedSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    cover_photo = CoverPhotoThumbnailSerializer()

    class Meta:
        model = Market
        fields = ('name', 'caption', 'description', 'opening_date', 'closing_date', 'opening_time', 'closing_time',
                  'contact_person_fullname', 'location', 'reservation_due_date', 'min_price', 'max_price',
                  'cover_photo', 'tags')
