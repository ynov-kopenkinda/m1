from rest_framework.serializers import ModelSerializer
from .models import Rider, Car


class CarSerializer(ModelSerializer[Car]):
    class Meta:
        model = Car
        fields = '__all__'
        depth = 2


class RiderSignupSerializer(ModelSerializer[Rider]):
    class Meta:
        model = Rider
        fields = ('first_name', 'last_name', 'login', 'password', 'sex')

    extra_kwargs = {
        'first_name': {'required': True, 'allow_blank': False},
        'last_name': {'required': True, 'allow_blank': False},
        'email': {'required': True, 'allow_blank': False},
        'password': {'required': True, 'allow_blank': False},
        'sex': {'required': True, 'allow_blank': False},
    }


class RiderSerializer(ModelSerializer[Rider]):
    class Meta:
        model = Rider
        fields = ('id', 'first_name', 'last_name', 'login', 'login', 'sex')
