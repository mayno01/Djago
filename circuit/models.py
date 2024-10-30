from django.db import models
from django.contrib.auth.models import User

class Circuit(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    rating = models.FloatField(default=0.0)  # Can store user ratings later
    difficulty_level = models.IntegerField(default=1)  # Assuming 1 represents an easy difficulty level

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    circuit = models.ForeignKey(Circuit, on_delete=models.CASCADE)
    rating = models.FloatField()
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.user} - {self.circuit} - {self.rating}'
    
