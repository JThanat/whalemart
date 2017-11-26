from django.db import models
from apps.markets.models import Market
from apps.users.models import User
from apps.lessors.models import Lessor

class Report(models.Model):
    report_content = models.CharField(verbose_name='Report Content', max_length=500)
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

    def __str__(self):
        return self.report_content