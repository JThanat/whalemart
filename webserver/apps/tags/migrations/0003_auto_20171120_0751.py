# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-20 07:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_auto_20171113_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='tag',
            field=models.CharField(max_length=255, unique=True, verbose_name='Tag'),
        ),
    ]