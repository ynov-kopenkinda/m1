from django.contrib import admin
from .models import Car, Rider, Admin

# Register your models here.

admin.site.register(Car)
admin.site.register(Rider)
admin.site.register(Admin)
