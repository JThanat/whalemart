from django.db import models

from apps.markets.models import Market
from apps.users.models import User


class Report(models.Model):
    report_content = models.CharField(verbose_name='Report Content', max_length=500)
    time_stamp = models.DateTimeField(verbose_name='Time Stamp')

    # user is a user who create the report
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='User',
        related_name='reporting_user'
    )

    market = models.ForeignKey(
        Market,
        on_delete=models.CASCADE,
        verbose_name='Market',
    )

    reported_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Reported User',
        related_name='reported_user'
    )

    def __str__(self):
        return self.report_content
