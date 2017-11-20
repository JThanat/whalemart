from django.contrib.postgres import fields
from django.db import models

from apps.commons.control_model import ControlModel
from apps.commons.file_upload import UploadedImage
from apps.markets.managers import MarketManager
from apps.tags.models import Tag


class Market(ControlModel):
    objects = MarketManager()
    # Money Transfer Status
    NOT_TRANSFERRED = 0
    IN_PROGRESS = 1
    COMPLETE = 2
    CANCELLED = 3
    MONEY_TRANSFER_STATUS_CHOICES = (
        (NOT_TRANSFERRED, 'Not Transferred'),
        (IN_PROGRESS, 'In Progress'),
        (COMPLETE, 'Complete'),
        (CANCELLED, 'Cancelled')
    )
    money_transfer_to_lessor_status = models.IntegerField(choices=MONEY_TRANSFER_STATUS_CHOICES,
                                                          default=NOT_TRANSFERRED)

    # Market General Info
    name = models.CharField(verbose_name='Market Name', max_length=100)
    caption = models.TextField(verbose_name='Market Caption')
    description = models.TextField(verbose_name='Market Description')

    # Time Info
    opening_date = models.DateTimeField(verbose_name='Opening Date', auto_now=False, auto_now_add=False)
    closing_date = models.DateTimeField(verbose_name='Closing Date', auto_now=False, auto_now_add=False)
    opening_time = models.TimeField(verbose_name='Opening Time', auto_now=False, auto_now_add=False)
    closing_time = models.TimeField(verbose_name='Closing Time', auto_now=False, auto_now_add=False)

    # Contact Info
    contact_person_fullname = models.CharField(verbose_name='Contact Person Fullname', max_length=100)
    contact_person_phone_number = models.CharField(verbose_name='Contact Person Phone Number', max_length=20)
    contact_person_email = models.EmailField(verbose_name='Contact Person Email')

    # Location
    location = models.CharField(verbose_name='location', max_length=200)
    location_latitude = models.DecimalField(verbose_name='Latitude', max_digits=10, decimal_places=6)
    location_longitude = models.DecimalField(verbose_name='Longitude', max_digits=10, decimal_places=6)

    # Terms
    term_and_condition = models.TextField(verbose_name='Terms and Conditions', max_length=1000)

    # Due Date
    deposit_payment_due = models.DateTimeField(verbose_name='Deposit Due Date', auto_now=False, auto_now_add=False)
    full_payment_due = models.DateTimeField(verbose_name='Full Payment Due Date', auto_now=False, auto_now_add=False)
    reservation_due_date = models.DateTimeField(verbose_name='Reservation Due Date', auto_now=False, auto_now_add=False)

    # Estimated Visitor
    estimate_visitor = models.IntegerField(verbose_name='Estimated Visitors', blank=True, null=True)

    # Derived Price Range
    min_price = models.DecimalField(verbose_name='Minimum Price', max_digits=20, decimal_places=5, blank=True,
                                    null=False)
    max_price = models.DecimalField(verbose_name='Maximum Price', max_digits=20, decimal_places=5, blank=True,
                                    null=False)

    # Cover Photo
    layout_photo = models.ImageField(verbose_name='Layout Image', upload_to='cover_photos/%Y/%m/%d')

    # Provided Accessories
    provided_accessories = fields.JSONField(verbose_name='Provided Accessories')

    def tag_set(self):
        tags = Tag.objects.filter(market=self.pk)
        tags = [x.tag for x in tags]
        return tags


class CoverPhoto(UploadedImage):
    market = models.OneToOneField('markets.Market', related_name='cover_photo', on_delete=models.CASCADE,
                                  primary_key=True)


class Scene(models.Model):
    market = models.ForeignKey('markets.Market', related_name='scene_photos', on_delete=models.CASCADE)
    scene_image = models.ImageField(verbose_name='Scene Image', upload_to='scene_photo/%Y/%m/%d')
