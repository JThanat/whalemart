from django.db import models

# Create your models here.
class BankAccount(models.Model):
    account_name = models.CharField(maxlength=30)
    account_id = models.CharField(maxlength=20)
    bank = models.CharField(maxlength=5)
    branch = models.CharField(maxlength=20)
