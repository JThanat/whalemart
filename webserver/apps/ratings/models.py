from django.db import models
from apps.lessors.models import Lessor

class Rating(models.Model):
    rating_score = models.FloatField(verbose_name='Rating Score')
    time_stamp = models.DateTimeField(verbose_name='Time Stamp')
    rater_name = models.CharField(verbose_name='Rater Name', max_length=100)

    lessor = models.ForeignKey(
        Lessor,
        on_delete=models.CASCADE,
        verbose_name='Lessor',
    )

    def __str__(self):
        return self.rating_score