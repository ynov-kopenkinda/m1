from jwt import decode
from rest_framework.request import Request
from .models import Rider, Admin
from .secrets import JWT_KEY


def ensure_admin(request: Request):
    auth_header = request.headers.get('Authorization')
    if (auth_header is None):
        return None
    try:
        token = auth_header.split(' ')[1]
        payload = decode(token, JWT_KEY, algorithms=['HS256'])
        if payload['type'] != 'admin':
            return None
        admin = Admin.objects.get(id=payload['id'])
        return admin
    except:
        return None


def ensure_rider(request: Request):
    auth_header = request.headers.get('Authorization')
    if (auth_header is None):
        return None
    try:
        token = auth_header.split(' ')[1]
        payload = decode(token, JWT_KEY, algorithms=['HS256'])
        if payload['type'] != 'rider' and payload['type'] != 'admin':
            return None
        rider = Rider.objects.get(id=payload['id'])
        return rider
    except:
        return None
