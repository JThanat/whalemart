from django.db import models
from apps.users.models import User


class Booth(models.Model):
    booth_number = models.CharField(verbose_name="Booth Number", max_length=5)
    rental_fee = models.IntegerField(verbose_name="Rental Fee")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='User',
    )

    def __str__(self):
        return self.booth_number
