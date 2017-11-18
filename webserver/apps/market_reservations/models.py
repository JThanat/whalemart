from django.db import models
from apps.users.models import User
from apps.booths.models import Booth


class MarketReservation(models.Model):
    PENDING = 0
    APPROVED = 1
    REJECTED = 2
    CANCELED = 3
    STATUS_CHOICE = (
        (PENDING, 'Pending'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
        (CANCELED, 'Canceled')
    )

    shop_name = models.CharField(verbose_name='Shop Name', max_length=100)
    reservation_time = models.DateTimeField(verbose_name='Reservation Time', auto_now=False, auto_now_add=True)
    status = models.IntegerField(verbose_name='Status',
                                 choices=STATUS_CHOICE,
                                 default=PENDING)


    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='User',
    )

    booth = models.ManyToManyField(
        Booth,
        verbose_name='Booth',
    )



    def __str__(self):
        return '%s-%s' % (self.user.first_name, self.shop_name)
