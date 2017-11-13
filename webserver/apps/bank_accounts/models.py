from django.db import models
from apps.lessors.models import Lessor

# Create your models here.
class BankAccount(models.Model):
    BANK_CHOICES = (
        ('BBL', 'Bankok Bank'),
        ('BBC', 'Bangkok Bank of Commerce'),
        ('KTB', 'Krung Thai Bank'),
        ('BAY', 'Bank of Ayudhya'),
        ('KBANK', 'Kasikorn Bank'),
        ('CITI', 'Citi Bank'),
        ('TMB', 'TMB Bank'),
        ('SCB', 'The Siam Commercial Bank'),
        ('NBANK', 'Thanachart Bank'),
        ('SCIB', 'Siam City Bank'),
        ('GSB', 'Government Savings Bank'),
        ('GHB', 'Government Housing Bank'),
    )
    account_name = models.CharField(verbose_name='Account Name', max_length=30)
    account_id = models.CharField(verbose_name='Account ID', max_length=20, unique=True)
    bank = models.CharField(verbose_name='Bank', max_length=5, choices=BANK_CHOICES)
    branch = models.CharField(verbose_name='Branch', max_length=20)

    lessor = models.ForeignKey(
        Lessor,
        on_delete=models.CASCADE,
        verbose_name='Lessor',
    )

    def __str__(self):
        return self.account_name
