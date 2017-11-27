from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Required for registration
    email = models.EmailField(verbose_name='Email', unique=True)
    first_name = models.CharField(verbose_name='First Name', max_length=50)
    last_name = models.CharField(verbose_name='Last Name', max_length=50)
    phone = models.CharField(verbose_name='Phone', max_length=20)
    facebook_id = models.CharField(verbose_name='Facebook Token', blank=True, max_length=20)
    is_verified = models.BooleanField(verbose_name='Is Verified', default=False)
    profile_image = models.ImageField(verbose_name='Profile Image', null=True, upload_to='profile_images/%Y/%m/%d')

    # Vendor profile
    def __str__(self):
        return '%s' % self.email


class CreditCard(models.Model):
    user = models.ForeignKey('users.User', verbose_name='User', related_name='credit_cards')
    card_number = models.CharField(verbose_name='Card Number', max_length=20)
    card_holder_name = models.CharField(verbose_name='Card Holder Name', max_length=50)
    MASTER_CARD = 1
    VISA = 2
    TYPE_CHOICES = (
        (MASTER_CARD, 'MasterCard'),
        (VISA, 'Visa')
    )
    type = models.PositiveSmallIntegerField(choices=TYPE_CHOICES)
    expiry_month = models.CharField(verbose_name='Expiry Month', max_length=2)
    expiry_year = models.CharField(verbose_name='Expiry Year', max_length=2)
    verification_no = models.CharField(verbose_name='Verification Number', max_length=10)

    def __str__(self):
        return self.card_number[-4:]
