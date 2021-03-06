# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-13 16:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20171112_1806'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_verified',
            field=models.BooleanField(default=False, verbose_name='Is Verified'),
        ),
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(null=True, upload_to='profile_images/%Y/%m/%d', verbose_name='Profile Image'),
        ),
        migrations.AlterField(
            model_name='user',
            name='facebook_token',
            field=models.TextField(blank=True, verbose_name='Facebook Token'),
        ),
    ]
