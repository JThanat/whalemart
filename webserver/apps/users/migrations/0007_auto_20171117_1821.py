# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-17 18:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20171117_1704'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='facebook_id',
            field=models.CharField(blank=True, max_length=20, unique=True, verbose_name='Facebook Token'),
        ),
    ]