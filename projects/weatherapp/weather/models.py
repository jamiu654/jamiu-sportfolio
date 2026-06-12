from django.db import models


class Location(models.Model):
    city = models.CharField(max_length=100, unique=True)
    country = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.city}, {self.country}"
