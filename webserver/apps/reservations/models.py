from django.db import models


class Reservation(models.Model):
    shop_name = models.CharField(verbose_name='Shop Name', max_length=100)
    reservation_time = models.DateTimeField(verbose_name='Reservation Time', auto_now=False, auto_now_add=True)

    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='User', related_name='reservations')
    market = models.ForeignKey('markets.Market', on_delete=models.CASCADE, verbose_name='Market',
                               related_name='reservations')
    approved_booth = models.ForeignKey('booths.Booth', null=True, verbose_name='Approved Booth',
                                       related_name='approved_reservations', on_delete=models.CASCADE)

    def __str__(self):
        return '%s-%s-%s' % (self.user.first_name, self.shop_name, self.market)


class ReservedBooth(models.Model):
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
    reservation = models.ForeignKey('reservations.Reservation', verbose_name='Reservation', on_delete=models.CASCADE,
                                    related_name='reserved_booths')
    booth = models.ForeignKey('booths.Booth', on_delete=models.PROTECT, verbose_name='Booth',
                              related_name='reserved_booths')
    status = models.IntegerField(verbose_name='Status', choices=STATUS_CHOICE, default=PENDING)

    def __str__(self):
        return '%s-%s' % (self.reservation.shop_name, self.booth)
