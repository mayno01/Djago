from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField(null=True)  
    description = models.TextField(null=True)  
    fee = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    image = models.ImageField(upload_to='event_images/', null=True)  

    def __str__(self):
        return self.title
