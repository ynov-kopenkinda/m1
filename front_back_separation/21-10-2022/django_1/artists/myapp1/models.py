from typing import List, Tuple
from django.db import models

# Create your models here.


class Artist(models.Model):
    STYLE: List[Tuple[str, str]] = [
        ("POP", "Pop"),
        ("RAP", "Rap"),
        ("CLS", "Classic"),
        ("RCK", "Rock"),
        ("UND", "Undefined"),
    ]
    name = models.CharField(max_length=100)
    style = models.CharField(max_length=3, choices=STYLE, default="UND")

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    duration = models.DurationField()
    release_date = models.DateField()

    def __str__(self):
        return self.title
