from django.db import models


class Market(models.Model):
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
    money_transfer_to_lessor_status = models.IntegerField(choices=MONEY_TRANSFER_STATUS_CHOICES, default=NOT_TRANSFERRED)

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
    location = models.CharField(verbose_name='location', max_length=None)
    location_latitude = models.DecimalField(verbose_name='Latitude', max_digits=9)
    location_longitude = models.DecimalField(verbose_name='Longitude', max_digits=9)

    # Terms
    term_and_condition = models.CharField(verbose_name='Terms and Conditions', max_length=None)

    # Due Date
    deposit_payment_due = models.DateTimeField(verbose_name='Deposit Due Date', auto_now=False, auto_now_add=False)
    full_payment_due = models.DateTimeField(verbose_name='Full Payment Due Date', auto_now=False, auto_now_add=False)
    reservation_due_date = models.DateTimeField(verbose_name='Reservation Due Date', auto_now=False, auto_now_add=False)

    # Estimated Visitor
    estimate_visitor = models.IntegerField(verbose_name='Estimated Visitors', blank=True, null=True)

    # Derived Price Range
    min_price = models.DecimalField(verbose_name='Minimum Price', blank=True, null=False)
    max_price = models.DecimalField(verbose_name='Maximum Price', blank=True, null=False)

    # Cover Photo
    cover_photo = models.ImageField(verbose_name='Cover Image', upload_to='cover_photos/%Y/%m/%d')
