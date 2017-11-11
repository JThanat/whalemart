from django.db import models
from apps.users.models import User

class Lessor(models.Model):
    lessor_name = models.CharField(verbose_name='Lessor Name', max_length=100)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True
    )

    def __str__(self):
        return self.lessor_name
