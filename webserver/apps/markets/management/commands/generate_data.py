import os
import random
from datetime import datetime, timezone
from random import randint

from PIL import Image
from django.conf import settings
from django.core.management.base import BaseCommand

from apps.booths.models import Booth
from apps.markets.models import Market
from apps.markets.models import Scene
from apps.tags.models import Tag


class Command(BaseCommand):
    help = 'Create Scene Images'

    def _create_image_name(self, filename, order):
        basename = filename.split(".")
        extension = basename.pop()
        new_name = "".join(basename)
        return "{name}_scene_{order}.{extension}".format(name=new_name, order=order, extension=extension)

    def _generate_scene(self, market):
        image_name = market.cover_photo.image
        if 'thumb' in image_name:
            return

        image = Image.open(settings.BASE_DIR + '/media/' + str(image_name))
        width, height = image.size

        crop_width = 720
        crop_height = 910

        shifting_range = (width - crop_width) / 4

        x = 0
        y = 445
        for i in range(5):
            temp_image = Image.open(settings.BASE_DIR + '/media/' + str(image_name))
            crop_image = temp_image.crop((x, y, x + crop_width, y + crop_height))
            new_filename = self._create_image_name(str(image_name), i)
            crop_image.save(os.path.join(settings.MEDIA_ROOT, new_filename))
            Scene.objects.create(market=market, scene_image=new_filename)
            x = x + shifting_range

    def _dump_tag(self, market):
        tags = ['Night', 'Day', 'Food', 'Fashion', 'Teen', 'Early', 'Festival', 'Handmade', 'Art',
                'Winter', 'LifeSytle', 'Shopping', 'Vacation', 'Music']
        n = len(tags)
        ran = random.randint(1, 1000)
        ntag = 3 if ran % n < 3 else ran % n
        for i in range(ntag):
            index = random.randint(1, 10000) % ntag
            tag = tags[index]
            tag_obj, is_created = Tag.objects.get_or_create(tag=tag)
            tag_obj.market.add(market)

    def _dump_provided_accessories(self, market):
        accessories = ['table', 'chair', 'light', 'plug']
        provided_accessories = {}
        for i in range(len(accessories)):
            provided_accessories[accessories[i]] = random.randint(1, 4)

        market.provided_accessories = provided_accessories
        market.save()

    def _dump_terms_and_conditions(self, market):
        terms = '''1. ห้ามจำหน่ายเครื่องดื่มแอลกอฮอล์ในพื้นที่ก่อนได้รับอนุญาต หากพบเห็นจะขอยึดสินค้าไว้
และได้รับใบเตือน 1 ครั้ง\n\n2. รองพื้นบูธด้วยไวนิล เพื่อป้องกันความเสียหาย เช่น คราบน้ำมันรอยไหม้เป็นต้น และต้องทา
การล้าง หรือขัดพื้น หลังจากทำการขายเสร็จสิ้นในวันสุดท้าย หากพื้นที่ในบูธสกปรก จะมี
ค่าปรับเพิ่ม 1,000 บาท\n\n3. การทิ้งน้ำและขยะลงในถุงขยะก่อนนำไปทิ้งที่จุดโหลดขยะของศูนย์หากไม่นำไปทิ้งที่จุดตาม
กำหนดจะได้รับใบเตือน 1 ครั้ง\n\n4. หากมีเครื่องใช้ไฟฟ้ากำลังไฟรวมกันสูงกว่า 1,800 วัตต์ กรุณาแจ้งกับทางทีมงานล่วงหน้า
ก่อนเพื่อทำการชำระค่าใช้จ่ายเพิ่มวันละ 100 บาท ห้ามเอาเครื่องใช้ไฟฟ้าที่กินไฟ เช่น ตู้แช่
เย็น เตาปิ้งมาใช้โดยไม่แจ้งทางทีมงานล่วงหน้าเด็ดขาด เพราะอาจทำให้ไฟตกและไฟดับได้
และถ้าหากเกิดความเสียหายภายในงานทางร้านจะต้องรับผิดชอบความผิดแต่เพียงผู้
เดียว และจะได้รับใบเตือน 1 ครั้ง\n\n5. ร้านค้าใดที่จะมีการเปิดเครื่องใช้ไฟฟ้าไว้ 24 ชม. ในช่วงวันงานกรุณาท าการแจ้งทางทีมงาน
ไว้ล่วงหน้า มิฉะนั้นทางทีมงานจะไม่เปิดไฟฟ้าให้ใช้ในช่วงงานปิด และหากเกิดความเสียหาย
แก่สินค้าทางผู้จัดจะไม่รับผิดชอบความเสียหายแต่อย่างใด โดยทางร้านจะต้องชำระ
ค่าใช้จ่ายเพิ่มขึ้น วันละ 100 บาท\n\n'''

        market.term_and_condition = terms
        market.save()

    def _dump_booths(self, market):
        number_of_zone = randint(3, 5)
        number_of_booth_in_each_zone = randint(20, 30)
        for i in range(number_of_zone):
            for j in range(number_of_booth_in_each_zone):
                rental_fee = 100 * randint(5, 50)
                booth_number = chr(i + 65).upper() + str(j + 1)
                Booth.objects.create(market=market, booth_number=booth_number, rental_fee=rental_fee)

    def _fix_datetime(self, market):
        reservation_due = market.reservation_due_date
        current_time = datetime.now(timezone.utc)
        if reservation_due < current_time:
            openning_date = market.opening_date
            delt = (openning_date - current_time) / 2
            market.reservation_due_date = current_time + delt
            market.save()

    def handle(self, *args, **options):
        markets = Market.objects.all()
        random.seed(1950)
        for market in markets:
            # dump image
            self._generate_scene(market)
            # dump Tag
            self._dump_tag(market)
            # dump provided accessories
            self._dump_provided_accessories(market)
            # dump terms and conditions
            self._dump_terms_and_conditions(market)
            # dump booths
            self._dump_booths(market)
            # fix date time
            self._fix_datetime(market)
