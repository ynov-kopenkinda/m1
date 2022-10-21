from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request

# Create your views here.

from .models import Shop, Furniture, Manager

from .serializers import ShopSerializer, FurnitureSerializer, ManagerSerializer


class FurnitureAPIView(ModelViewSet):
    serializer_class = FurnitureSerializer

    def get_queryset(self):
        data = Furniture.objects.all()
        return data

    @action(detail=True, methods=['put'])
    def change_state(self, request: Request, pk: int):
        furniture = Furniture.objects.get(id=pk)
        furniture.state = request.data['state']
        furniture.save()
        return Response({'message': 'state changed to {}'.format(furniture.state)})

    @action(detail=True, methods=['post'], url_path='buy')
    def buy(self, request: Request, pk: int):
        furniture = Furniture.objects.get(id=pk)
        if furniture.status == 'BGT':
            return Response({'message': 'This furniture is already bought'}, status=400)
        furniture.status = 'BGT'
        price = furniture.price
        shop = furniture.shop
        shop.turnover += price
        shop.save()
        furniture.save()
        return Response({"furniture": furniture.status, "shop": shop.name})


class ShopAPIView(ModelViewSet):
    serializer_class = ShopSerializer

    def get_queryset(self):
        data = Shop.objects.all()
        return data


class ManagerAPIView(ModelViewSet):
    serializer_class = ManagerSerializer

    def get_queryset(self):
        data = Manager.objects.all()
        return data
