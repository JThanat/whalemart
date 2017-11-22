# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-18 06:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('booths', '0003_auto_20171116_0220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booth',
            name='market',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='booths', to='markets.Market', verbose_name='Market'),
        ),
    ]
