from django.db import models


class Market(models.Model):
    name = models.CharField(verbose_name='Market Name', max_length=100)
    caption = models.TextField(verbose_name='Market Caption')

    # Time Info
    opening_date = models.DateTimeField(verbose_name='Opening Date', auto_now=False, auto_now_add=False)
    closing_date = models.DateTimeField(verbose_name='Closing Date', auto_now=False, auto_now_add=False)
    opening_time = models.TimeField(verbose_name='Opening Time', auto_now=False, auto_now_add=False)
    closing_time = models.TimeField(verbose_name='Closing Time', auto_now=False, auto_now_add=False)

    # Contact Info

    # Terms
    term_and_condition = models.CharField(verbose_name='Terms and Conditions', max_length=None)
