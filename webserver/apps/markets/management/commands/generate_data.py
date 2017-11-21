import os

from PIL import Image
from django.conf import settings
from django.conf.urls.static import static
from django.core.management.base import BaseCommand

from apps.markets.models import Market
from apps.markets.models import Scene


class Command(BaseCommand):
    help = 'Create Scene Images'

    def _create_image_name(self, filename, order):
        basename = filename.split(".")
        extension = basename.pop()
        new_name = "".join(basename)
        return "{name}_scene_{order}.{extension}".format(name=new_name, order=order, extension=extension)

    def handle(self, *args, **options):
        markets = Market.objects.all()
        for market in markets:
            image_name = market.cover_photo.image
            market_id = market.id
            if 'thumb' in image_name:
                continue

            base_path = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
            image = Image.open(settings.BASE_DIR + '/media/' + str(image_name))
            width, height = image.size

            width_ratio = width / 5
            crop_width = 720
            crop_height = 910

            shifting_range = (width - crop_width) / 4

            x = 0
            y = 445
            for i in range(5):
                temp_image = Image.open(settings.BASE_DIR + '/media/' + str(image_name))
                crop_image = temp_image.crop((x, y, x + 720, y + 910))
                new_filename = self._create_image_name(str(image_name), i)
                crop_image.save(os.path.join(settings.MEDIA_ROOT, new_filename))
                Scene.objects.create(market=market, scene_image=new_filename)
                x = x + shifting_range

