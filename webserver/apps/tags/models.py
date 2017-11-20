from django.db import models


class Tag(models.Model):
    market = models.ManyToManyField('markets.Market', related_name='tags')
    tag = models.CharField(verbose_name='Tag', unique=True, max_length=255)
