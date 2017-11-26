from django.db import models
from apps.markets.models import Market
from apps.users.models import User
from apps.lessors.models import Lessor

class Rating(models.Model):
    rating_score = models.IntegerField(verbose_name='Rating Score')
    time_stamp = models.DateTimeField(verbose_name='Time Stamp')

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='User',
    )

    market = models.ForeignKey(
        Market,
        on_delete=models.CASCADE,
        verbose_name='Market',
    )

    lessor = models.ForeignKey(
        Lessor,
        on_delete=models.CASCADE,
        verbose_name='Lessor',
    )

    class Meta:
        unique_together = (('user', 'market'),)

    def __str__(self):
        return str(self.rating_score)
