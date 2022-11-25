from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from jwt import encode
from .secrets import JWT_KEY

from .serializers import RiderSignupSerializer, CarSerializer
from .models import Rider, Admin, Car
from .middlewares import ensure_rider, ensure_admin
# Create your views here.


class RiderApiView(ModelViewSet):
    @action(detail=False, methods=['post'])
    def signup(self, request: Request) -> Response:
        data = request.data
        serializer = RiderSignupSerializer(data=data)
        if serializer.is_valid():
            if not Rider.objects.filter(login=data['login']).exists():
                rider = Rider.objects.create(
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    sex=data['sex'],
                    login=data['login'],
                    password=make_password(data['password']),
                    birth_date=data['birth_date'],
                )
                rider.save()
                return Response({'message': 'User Created Successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'User Already Exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request: Request) -> Response:
        data = request.data
        if not Rider.objects.filter(login=data['login']).exists():
            return Response({'message': 'User Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)
        rider = Rider.objects.get(login=data['login'])
        if not check_password(data['password'], rider.password):
            return Response({'message': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
        user = {"id": rider.id, "first_name": rider.first_name, "type": "rider"}
        token = encode(
            user,
            JWT_KEY,
            algorithm='HS256'
        )
        return Response({"token": token, "user": user}, status=status.HTTP_200_OK)


class AdminApiView(ModelViewSet):
    @action(detail=False, methods=['post'])
    def login(self, request: Request) -> Response:
        data = request.data
        if not Admin.objects.filter(login=data['login']).exists():
            return Response({'message': 'User Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)
        admin = Admin.objects.get(login=data['login'])
        if not check_password(data['password'], admin.password):
            return Response({'message': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
        user = {"id": admin.id, "first_name": admin.first_name, "type": "admin"}
        token = encode(
            user,
            JWT_KEY,
            algorithm='HS256'
        )
        return Response({"token": token, "user": user}, status=status.HTTP_200_OK)


class CarApiView(ModelViewSet):
    @action(detail=False, methods=['get'])
    def get_all_cars(self, request: Request) -> Response:
        user = ensure_rider(request)
        if user is None:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        cars = Car.objects.filter(rented_by=None)
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_all_cars_with_rented(self, request: Request) -> Response:
        user = ensure_rider(request)
        if user is None:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        cars = Car.objects.filter(rented_by=user)
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def rent_a_car(self, request: Request, pk: int) -> Response:
        user = ensure_rider(request)
        if user is None:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        car = Car.objects.get(id=pk)
        if car.rented_by is not None:
            return Response({'message': 'Car Already Rented'}, status=status.HTTP_400_BAD_REQUEST)
        car.rented_by = user
        car.save()
        return Response({'message': 'Car Rented Successfully'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unrent_a_car(self, request: Request, pk: int) -> Response:
        user = ensure_rider(request)
        if user is None:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        car = Car.objects.get(id=pk)
        car.rented_by = None
        car.save()
        return Response({'message': 'Car Unrented Successfully'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_a_car(self, request: Request) -> Response:
        user = ensure_admin(request)
        if user is None:
            return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data
        car = Car.objects.create(
            brand=data['brand'],
            model=data['model'],
            mileage=data['mileage'],
            daily_price=data['daily_price'],
            rented_by=None,
            created_by=user
        )
        car.save()
        return Response({'message': 'Car Added Successfully'}, status=status.HTTP_200_OK)
