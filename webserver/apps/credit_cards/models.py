from django.db import models


class CreditCard(models.Model):
    card_number = models.CharField(verbose_name='Card Number', max_length=20)
    card_holder_name = models.CharField(verbose_name='Card Holder Name', max_length=50)
    MASTER_CARD = 1
    VISA = 2
    TYPE_CHOICES = (
        (MASTER_CARD, 'MasterCard'),
        (VISA, 'Visa')
    )
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICES)
    expiry_date = models.DateField(verbose_name='Expiry Date')
    verification_no = models.CharField(verbose_name='Verification Number', max_length=10)

    def __str__(self):
        return self.card_number
