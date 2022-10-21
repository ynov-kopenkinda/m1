from rest_framework.serializers import ModelSerializer
from .models import Shop, Furniture, Manager


class FurnitureSerializer (ModelSerializer[Furniture]):
    class Meta:
        model = Furniture
        fields = '__all__'
        depth = 2


class ShopSerializer (ModelSerializer[Shop]):
    class Meta:
        model = Shop
        fields = '__all__'
        depth = 2


class ManagerSerializer (ModelSerializer[Manager]):
    class Meta:
        model = Manager
        fields = '__all__'
        depth = 2
