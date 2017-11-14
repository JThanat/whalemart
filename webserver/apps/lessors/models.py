from django.db import models
from apps.users.models import User


class Lessor(models.Model):
    lessor_name = models.CharField(verbose_name="Lessor Name", max_length=100)

    is_organization = models.BooleanField(verbose_name="Is Organization", default=False)

    organization_name = models.CharField(verbose_name="Organization Name", max_length=100, blank=True, default='')
    organization_contact_name = models.CharField(
        verbose_name="Organization Contact Name", max_length=100, blank=True, default=''
    )
    organization_email = models.EmailField(
        verbose_name="Organization Email", max_length=254, blank=True, default=''
    )
    organization_phone_number = models.CharField(
        verbose_name="Organization Phone Number",
        max_length=15, blank=True,
        default=''
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name="User",
    )

    def __str__(self):
        return self.lessor_name
