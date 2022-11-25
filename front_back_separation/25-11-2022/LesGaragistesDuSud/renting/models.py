from django.db import models

# Create your models here.

SEXES: list[tuple[str, str]] = [("M", "Male"), ("F", "Female")]


class Rider(models.Model):
    id = models.AutoField(primary_key=True)
    login = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    sex = models.CharField(max_length=1, choices=SEXES)
    birth_date = models.DateField()


class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    login = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    sex = models.CharField(max_length=1, choices=SEXES)
    birth_date = models.DateField()


class Car(models.Model):
    id = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=200)
    model = models.CharField(max_length=200)
    mileage = models.IntegerField()
    daily_price = models.IntegerField()
    rented_by = models.ForeignKey(
        Rider, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_by = models.ForeignKey(
        Admin, on_delete=models.CASCADE, null=True, blank=True
    )
