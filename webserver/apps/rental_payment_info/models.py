from django.db import models


class RentalPaymentInfo(models.Model):
    DEPOSITED = 1
    FULLY_PAID = 2
    STATUS_CHOICES = (
        (DEPOSITED, 'Deposited'),
        (FULLY_PAID, 'Fully Paid')
    )
    status = models.IntegerField(verbose_name='Status', choices=STATUS_CHOICES, default=DEPOSITED)
    user = models.ForeignKey('users.User', verbose_name='User', related_name='rental_payment_info')
    reservation_info = models.ForeignKey('market_reservations.MarketReservation', verbose_name='Market Reservation',
                                         related_name='rental_payment_infos')

    def __str__(self):
        return '%s %s' % (self.user.first_name, self.reservation_info)


class Installment(models.Model):
    CREDIT_CARD = 1
    BANK_TRANSFER = 2
    PAYMENT_METHOD_CHOICES = (
        (CREDIT_CARD, 'Credit Card'),
        (BANK_TRANSFER, 'Bank Transfer'),
    )
    payment_method = models.IntegerField(verbose_name='Payment Method', choices=PAYMENT_METHOD_CHOICES)
    round = models.IntegerField(verbose_name='Round')
    payment_date = models.DateField(verbose_name='Payment Date', auto_now_add=True)
    amount = models.DecimalField(verbose_name='Amount', max_digits=15, decimal_places=2)
    credit_card = models.ForeignKey('users.CreditCard', verbose_name='Credit Card')
    receipt_image = models.ImageField(verbose_name='Receipt Image', null=True, upload_to='receipt_images/%Y/%m/%d')
    is_verified = models.BooleanField(verbose_name='Is Verified', default=False)
    rental_payment_info = models.ForeignKey('rental_payment_info.RentalPaymentInfo',
                                            verbose_name='Rental Payment Info',
                                            related_name='installments')
