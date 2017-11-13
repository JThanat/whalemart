import os
import uuid

from PIL import Image
from django.conf import settings
from django.db import models


def random_filename(instance, filename):
    """
    Generates a random image name using uuid4
    :param instance: parameter for Callable upload_to
    :param filename: parameter for Callable upload_to
    :return: string of random filename
    """
    img_extension = filename.split(".").pop()
    img_name = str(uuid.uuid4())
    return "{name}.{extension}".format(name=img_name, extension=img_extension)


def create_thumb_name(filename):
    basename = filename.split(".")
    extension = basename.pop()
    new_name = "".join(basename)
    return "{name}_thumb.{extension}".format(name=new_name, extension=extension)


def create_thumbnail(input_image, thumbnail_size=(600, 600)):
    if not input_image:
        return
    img = Image.open(input_image)
    img.thumbnail(thumbnail_size)
    filename = random_filename(None, os.path.basename(input_image.name))
    # extract file name
    new_filename = create_thumb_name(filename)

    img.save(os.path.join(settings.MEDIA_ROOT, new_filename))

    return new_filename


class UploadedImage(models.Model):
    """
    Provides a model for uploading image and creating a thumbnail for image
    """
    #
    image = models.ImageField(verbose_name="Uploaded Image", upload_to=random_filename)

    # thumbnail
    thumbnail = models.ImageField(verbose_name="Thumb Nail", blank=True)

    class Meta:
        abstract = True

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        """
        On save, we add thumbnail
        :param force_insert:
        :param force_update:
        :param using:
        :param update_fields:
        :return:
        """
        self.thumbnail = create_thumbnail(self.image)
        return super(UploadedImage, self).save(force_update=force_update)
