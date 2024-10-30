from django.db import models

# Create your models here.

class Destination(models.Model):
    name = models.CharField(max_length=100)                  # Destination name
    description = models.TextField()                         # Brief description
    location = models.CharField(max_length=100)              # City/Country or general location
    price = models.DecimalField(max_digits=8, decimal_places=2)  # Estimated cost
    image = models.ImageField(upload_to='destinations/')     # Image upload for destination
    popular = models.BooleanField(default=False)             # Mark as popular destination

    def __str__(self):
        return self.name

