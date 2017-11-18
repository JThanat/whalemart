from django.db import models
from apps.vendors.models import Vendor


class MarketReservation(models.Model):

    shop_name = models.CharField(verbose_name='Shop Name', max_length=100)
    reservation_time = models.DateTimeField(verbose_name='Reservation Time', auto_now=False, auto_now_add=True)
    status = models.CharField(verbose_name='Status', max_length=100)


    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        verbose_name='Vendor',
    )

    booth = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        verbose_name='Vendor',
    )



    def __str__(self):
        return self.account_name
