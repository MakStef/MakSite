from django.db import models
from .utils.normalize import normalize_link
# Create your models here.


class Portfolio(models.Model):
    name = models.CharField(max_length=256)
    link = models.CharField(
        blank=True,
        max_length=256,
    )
    image = models.ImageField(
        verbose_name="Image (16x10)",
        blank=True,
        upload_to="portfolios",
        max_length=None
    )
    is_first = models.BooleanField(default=True)

    def save(self, *args, **kwargs):

        objects = list(Portfolio.objects.all())

        # If this array is appended from empty
        if len(objects) == 0:
            self.is_first = True

            # Normalizing link
            self.link = normalize_link(self.link)

            # Commit saving
            super().save(*args, **kwargs)

            return

        # If object is not in objects array it's is_first opposite of last item's is_first
        if self not in objects:
            self.is_first = not objects[-1].is_first

        # If item is first in array we set it's is_first on true
        elif self is objects[0]:
            self.is_first = True

        # If object was in array and is not first, then is_first opposite of previous items
        else:
            self.is_first = not objects[objects.index(self) - 1].is_first

        # Normalizing link
        self.link = normalize_link(self.link)

        # Commit saving
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        objects = list(Portfolio.objects.all())
        index = objects.index(self)
        for obj in objects[index::]:
            obj.save()

        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name
