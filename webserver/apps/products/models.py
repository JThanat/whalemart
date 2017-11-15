from django.db import models
from apps.users.models import User

import uuid


def random_filename(instance, filename):
    """
    Generates a random image name using uuid4
    :param instance: parameter for Callable upload_to
    :param filename: parameter for Callable upload_to
    :return: string of random filename
    """
    img_extension = filename.split(".").pop()
    img_name = str(uuid.uuid4())
    return "products/{name}.{extension}".format(name=img_name, extension=img_extension)


class Product(models.Model):
    name = models.CharField(verbose_name="Product Name", max_length=254)
    description = models.CharField(verbose_name="Product Description", max_length=254)
    image = models.ImageField(verbose_name="Image", upload_to=random_filename)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="User"
    )

    def __str__(self):
        return self.name
