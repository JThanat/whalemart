import re

from rest_framework import serializers

from apps.booths.models import Booth
from apps.commons.custom_field import MyListField, MyDictField
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
    market = serializers.PrimaryKeyRelatedField(queryset=Market.objects.all())

    class Meta:
        model = Scene
        fields = ('id', 'scene_image', 'market')


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
    booth_list = MyListField(
        child=MyDictField(child=serializers.DecimalField(max_digits=10, decimal_places=6)),
        write_only=True
    )
    # booths = BoothSerializer(many=True)

    class Meta:
        model = Market
        fields = (
            'id', 'name', 'caption', 'description', 'opening_date', 'closing_date', 'opening_time', 'closing_time',
            'contact_person_fullname', 'contact_person_phone_number', 'contact_person_email', 'location',
            'location_latitude', 'location_longitude', 'term_and_condition', 'deposit_payment_due',
            'full_payment_due', 'reservation_due_date', 'estimate_visitor', 'min_price', 'max_price',
            'layout_photo', 'provided_accessories', 'cover_photo', 'scene_photo_list', 'tag_list', 'booth_list'
        )


    def create(self, validated_data):
        tags_data = validated_data.pop('tag_list', None)
        cover_photo = validated_data.pop('cover_photo', None)
        scene_images = validated_data.pop('scene_photo_list', None)
        booths = validated_data.pop('booth_list', None)

        min_price = None
        max_price = None

        for booth in booths:
            price = list(booth.values())[0]
            if min_price is None and max_price is None:
                min_price = price
                max_price = price

            if price < min_price:
                min_price = price

            if price > max_price:
                max_price = price

        validated_data['created_user'] = self.context.get('request').user
        validated_data['updated_user'] = self.context.get('request').user
        validated_data['min_price'] = min_price
        validated_data['max_price'] = max_price

        market = Market.objects.create(**validated_data)

        CoverPhoto.objects.create(market=market, **cover_photo)

        for tag in tags_data:
            tag_obj, is_created = Tag.objects.get_or_create(tag=tag)
            tag_obj.market.add(market)

        for scene_image in scene_images:
            Scene.objects.create(market=market, scene_image=scene_image)

        for booth in booths:
            booth_num = list(booth.keys())[0]
            price = list(booth.values())[0]
            Booth.objects.create(market=market, booth_number=booth_num, rental_fee=price)

        return market

    def to_representation(self, instance):
        repr = super(MarketSerializer, self).to_representation(instance)

        scene_list = Scene.objects.filter(market=instance.id)
        tag_list = Tag.objects.filter(market=instance.id)
        cover_photo_id = CoverPhoto.objects.filter(market=instance.id).first().pk

        scenes = []
        for scene in scene_list:
            serialized_scene = SceneSerializer().to_representation(scene)
            serialized_scene['id'] = scene.id
            scenes.append(serialized_scene)

        tags = []
        for tag in tag_list:
            serialized_tag = TagSerializer().to_representation(tag)
            tags.append(serialized_tag)

        repr['scene_photo_list'] = scenes
        repr['tag_list'] = tags
        repr['cover_photo']['id'] = cover_photo_id
        return repr

    def update(self, instance, validated_data):
        print(validated_data)
        market = super(MarketSerializer, self).update(instance, validated_data)

        # Update Tag
        tags_data = validated_data.pop('tag_list', None)
        existing_tag = market.tag_set()
        for tag in tags_data:
            tag_obj, is_created = Tag.objects.get_or_create(tag=tag)
            # Get all tag already in the market
            tag_obj.market.add(market)

        # Remove deleted tag
        for tag in existing_tag:
            if not tag in tags_data:
                Tag.objects.get(tag=tag).market.remove(market)

        return market


class MarketFeedSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    cover_photo = CoverPhotoThumbnailSerializer()

    class Meta:
        model = Market
        fields = (
            'id', 'name', 'caption', 'description', 'opening_date', 'closing_date', 'opening_time', 'closing_time',
            'contact_person_fullname', 'location', 'reservation_due_date', 'min_price', 'max_price',
            'cover_photo', 'tags', 'id')
