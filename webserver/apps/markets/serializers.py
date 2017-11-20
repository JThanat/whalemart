import re

from rest_framework import serializers

from apps.booths.models import Booth
from apps.commons.custom_field import MyListField
from apps.markets.models import Market, CoverPhoto, Scene
from apps.tags.models import Tag
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

        # def to_representation(self, instance):
        #     return super(SceneSerializer, self).to_representation(instance)


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
    tag_list = MyListField(
        child=serializers.CharField(max_length=255),
        write_only=True
    )
    cover_photo = CoverPhotoSerializer()
    scene_photo_list = serializers.ListField(
        child=serializers.FileField(max_length=100000,
                                    allow_empty_file=False,
                                    use_url=False),
        write_only=True
    )

    # booths = BoothSerializer(many=True)

    class Meta:
        model = Market
        fields = ('name', 'caption', 'description', 'opening_date', 'closing_date', 'opening_time', 'closing_time',
                  'contact_person_fullname', 'contact_person_phone_number', 'contact_person_email', 'location',
                  'location_latitude', 'location_longitude', 'term_and_condition', 'deposit_payment_due',
                  'full_payment_due', 'reservation_due_date', 'estimate_visitor', 'min_price', 'max_price',
                  'layout_photo', 'provided_accessories', 'cover_photo', 'scene_photo_list', 'tag_list')

    def create(self, validated_data):
        print('validated data%s' % validated_data)
        tags_data = validated_data.pop('tag_list')
        cover_photo = validated_data.pop('cover_photo')
        scene_images = validated_data.pop('scene_photo_list')
        # booths = validated_data.pop('booths')

        validated_data['created_user'] = self.context.get('request').user
        validated_data['updated_user'] = self.context.get('request').user

        market = Market.objects.create(**validated_data)

        CoverPhoto.objects.create(market=market, **cover_photo)

        for tag in tags_data:
            tag_obj = Tag(tag=tag)
            tag_obj.save()
            tag_obj.market.add(market)

        for scene_image in scene_images:
            Scene.objects.create(market=market, scene_image=scene_image)

        # for booth in booths:
        #     Booth.objects.create(market=market, **booth)

        return market

    def to_representation(self, instance):
        repr = super(MarketSerializer, self).to_representation(instance)

        scene_list = Scene.objects.filter(market=instance.id)
        tag_list = Tag.objects.filter(market=instance.id)

        a = []
        for scene in scene_list:
            serialized_scene = SceneSerializer().to_representation(scene)
            a.append(serialized_scene)

        scene_dict = {}
        scene_dict['scene_photos'] = a

        b = []
        for tag in tag_list:
            serialized_tag = TagSerializer().to_representation(tag)
            b.append(serialized_tag)

        tag_dict = {}
        tag_dict['tag_list'] = b

        repr['scene_photo_list'] = scene_dict
        repr['tag_list'] = tag_dict
        return repr

    def update(self, instance, validated_data):
        print(validated_data)
        market = super(MarketSerializer, self).update(instance, validated_data)

        # Update Tag
        tags_data = validated_data.pop('tag_list', None)
        for tag in tags_data:
            tag_obj = Tag(tag=tag)
            tag_obj.save()
            tag_obj.market.add(market)

        return market


class MarketFeedSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    cover_photo = CoverPhotoThumbnailSerializer()

    class Meta:
        model = Market
        fields = ('name', 'caption', 'description', 'opening_date', 'closing_date', 'opening_time', 'closing_time',
                  'contact_person_fullname', 'location', 'reservation_due_date', 'min_price', 'max_price',
                  'cover_photo', 'tags', 'id')
