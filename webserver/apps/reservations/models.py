from django.db import models

from apps.commons.choices import ReservationStatus


class Reservation(models.Model):
    shop_name = models.CharField(verbose_name='Shop Name', max_length=100)
    reservation_time = models.DateTimeField(verbose_name='Reservation Time', auto_now=False, auto_now_add=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='User', related_name='reservations')
    market = models.ForeignKey('markets.Market', on_delete=models.CASCADE, verbose_name='Market',
                               related_name='reservations')
    approved_booth = models.ForeignKey('booths.Booth', null=True, verbose_name='Approved Booth',
                                       related_name='approved_reservations', on_delete=models.CASCADE)
    status = models.IntegerField(verbose_name='Status', choices=ReservationStatus.CHOICES,
                                 default=ReservationStatus.PENDING)
    products = models.ManyToManyField('products.Product', verbose_name='products', related_name='reservations')

    class Meta:
        unique_together = ('user', 'market')

    def __str__(self):
        return '%s-%s-%s' % (self.user.first_name, self.shop_name, self.market)


class ReservedBooth(models.Model):
    reservation = models.ForeignKey('reservations.Reservation', verbose_name='Reservation', on_delete=models.CASCADE,
                                    related_name='reserved_booths')
    booth = models.ForeignKey('booths.Booth', on_delete=models.PROTECT, verbose_name='Booth',
                              related_name='reserved_booths')
    status = models.IntegerField(verbose_name='Status', choices=ReservationStatus.CHOICES,
                                 default=ReservationStatus.PENDING)

    def __str__(self):
        return '%s-%s' % (self.reservation.shop_name, self.booth)
