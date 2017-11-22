from django.db import models


class RentalPaymentInfo(models.Model):
    DRAFTED = 0
    DEPOSITED = 1
    FULLY_PAID = 2
    STATUS_CHOICES = (
        (DRAFTED, 'Drafted'),
        (DEPOSITED, 'Deposited'),
        (FULLY_PAID, 'Fully Paid')
    )
    status = models.IntegerField(verbose_name='Status', choices=STATUS_CHOICES, default=DRAFTED)
    user = models.ForeignKey('users.User', verbose_name='User', related_name='rental_payment_info')
    reservation = models.ForeignKey('reservations.Reservation', verbose_name='Reservation',
                                         related_name='rental_payment_infos')

    def __str__(self):
        return '%s %s' % (self.user.first_name, self.reservation)


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
    receipt_image = models.ImageField(verbose_name='Receipt Image', null=True, upload_to='receipt_images/%Y/%m/%d')
    PENDING = 1
    APPROVED = 2
    REJECTED = 3
    VERIFICATION_STATUS_CHOICES = (
        (PENDING, 'Pending'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
    )
    verification_status = models.IntegerField(choices=VERIFICATION_STATUS_CHOICES, verbose_name='Verification Status',
                                              default=PENDING)
    rental_payment_info = models.ForeignKey('rental_payment_info.RentalPaymentInfo',
                                            verbose_name='Rental Payment Info',
                                            related_name='installments')
