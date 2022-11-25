from renting.models import Admin, Car, Rider
from django.contrib.auth.hashers import make_password
from typing import Literal
from datetime import date
from random import randint


def make_admin(id: str, sex: Literal['F', 'M']):
    admin = Admin()
    admin.first_name = "Admin"
    admin.last_name = id
    admin.login = "admin" + id
    admin.password = make_password("admin" + id)
    admin.sex = sex
    admin.birth_date = date(2000, 1, 1)
    admin.save()
    return admin


def make_rider(id: str, sex: Literal['F', 'M']):
    rider = Rider()
    rider.first_name = "Rider"
    rider.last_name = id
    rider.login = "rider" + id
    rider.password = make_password("rider" + id)
    rider.sex = sex
    rider.birth_date = date(2000, 1, 1)
    rider.save()
    return rider


def make_car(owner: Admin, rented_by: Rider | None):
    car = Car()
    car.brand = "BMW"
    car.model = ("Series 5", "Series 3", "X5", "X6")[randint(0, 3)]
    car.mileage = randint(10000, 100000)
    car.daily_price = randint(10, 100)
    car.created_by = owner
    car.rented_by = rented_by
    car.save()
    return car


def seed():
    admin1 = make_admin('1', 'M')
    admin2 = make_admin('2', 'F')
    rider1 = make_rider('1', 'M')
    rider2 = make_rider('2', 'F')
    make_rider('3', 'M')
    make_car(admin1, None)
    make_car(admin2, None)
    make_car(admin2, None)
    make_car(admin1, None)
    make_car(admin1, rider1)
    make_car(admin2, rider2)


def run():
    seed()
