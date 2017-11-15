from django.db import models
from apps.markets.models import Market


class Booth(models.Model):
    booth_number = models.CharField(verbose_name="Booth Number", max_length=5)
    rental_fee = models.DecimalField(
        verbose_name="Rental Fee", max_digits=20, decimal_places=2)
    market = models.ForeignKey(
        Market,
        on_delete=models.CASCADE,
        verbose_name='Market',
    )

    class Meta:
        unique_together = (('market', 'booth_number'),)

    def __str__(self):
        return '%s - %s' % (self.market.name, self.booth_number)
