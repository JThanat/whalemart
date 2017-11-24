from django.db import models
from apps.lessors.models import Lessor
from apps.users.models import User

class Report(models.Model):
    report_content = models.CharField(verbose_name='Report Content', max_length=500)
    time_stamp = models.DateTimeField(verbose_name='Time Stamp')

    lessor = models.ForeignKey(
        Lessor,
        on_delete=models.CASCADE,
        verbose_name='Lessor',
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='User',
    )

    def __str__(self):
        return self.report_content