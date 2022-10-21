from django.db import models

# Create your models here.


class Shop(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    turnover = models.IntegerField()

    def __str__(self):
        return self.name


class Furniture(models.Model):
    FURNITURE_STATE = [
        ('NEW', 'New'),
        ('USD', 'Used'),
        ('BRK', 'Broken'),
        ('UNS', 'Unsuitable'),
    ]
    FURNITURE_STATUS = [
        ('AVL', 'Available'),
        ('BGT', 'Bought'),
    ]
    name = models.CharField(max_length=100)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, related_name='furniture')
    state = models.CharField(
        max_length=3, choices=FURNITURE_STATE, default="NEW")
    status = models.CharField(
        max_length=3, choices=FURNITURE_STATUS, default="AVL")

    price = models.IntegerField(default=100)

    def __str__(self):
        return self.name


class Manager(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, related_name="managers")

    def __str__(self):
        return self.name
