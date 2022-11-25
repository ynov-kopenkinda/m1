from jwt import decode
from django.conf.global_settings import SECRET_KEY
from rest_framework.request import Request
from .models import Rider, Admin


def ensure_admin(request: Request):
    auth_header = request.headers.get('Authentication')
    if (auth_header is None):
        return None
    try:
        token = auth_header.split(' ')[1]
        payload = decode(token, SECRET_KEY)
        if payload['type'] != 'admin':
            return None
        admin = Admin.objects.get(id=payload['id'])
        return admin
    except:
        return None


def ensure_rider(request: Request):
    auth_header = request.headers.get('Authentication')
    if (auth_header is None):
        return None
    try:
        token = auth_header.split(' ')[1]
        payload = decode(token, SECRET_KEY)
        if payload['type'] != 'rider':
            return None
        rider = Rider.objects.get(id=payload['id'])
        return rider
    except:
        return None
