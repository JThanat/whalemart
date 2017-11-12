from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Required for registration
    email = models.EmailField(verbose_name='Email', unique=True)
    first_name = models.CharField(verbose_name='First Name', max_length=50)
    last_name = models.CharField(verbose_name='Last Name', max_length=50)
    phone = models.CharField(verbose_name='Phone', max_length=20)
    facebook_token = models.TextField(verbose_name='Facebook Token', blank=True)
    is_verified = models.BooleanField(verbose_name='Is Verified', default=False)
    profile_image = models.ImageField(verbose_name='Profile Image', null=True, upload_to='profile_images/%Y/%m/%d')

    # Vendor profile
    def __str__(self):
        return '%s' % self.email
