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
        blank=True,
        upload_to="portfolios",
        max_length=None
    )
    is_first = models.BooleanField(default=True)

    def save(self, first_save=True, *args, **kwargs):
        if first_save:
            # It sets is Portfolio item first in pair or not
            objects = list(Portfolio.objects.all())
            if len(objects) > 0:
                prev = objects[objects.index(self) - 1]
                print(prev.is_first)
                self.is_first = not prev.is_first
            else:
                self.is_first = True

        # Normalizing link
        self.link = normalize_link(self.link)

        # Commit saving
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        objects = list(Portfolio.objects.all())
        index = objects.index(self)
        for obj in objects[index::]:
            obj.is_first = not obj.is_first
            obj.save(first_save=False)

        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name
