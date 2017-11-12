from django.db import models
from apps.lessors.models import Lessor

# Create your models here.
class BankAccount(models.Model):
    account_name = models.CharField(max_length=30)
    account_id = models.CharField(max_length=20, unique=True)
    bank = models.CharField(max_length=5)
    branch = models.CharField(max_length=20)

    lessor = models.ForeignKey(
        Lessor,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.account_name
