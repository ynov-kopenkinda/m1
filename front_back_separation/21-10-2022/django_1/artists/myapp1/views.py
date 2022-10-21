from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Artist, Song
from .serializers import ArtistSerializer, SongSerializer

# Create your views here.


class ArtistAPIView(APIView):
    def get(self, *args: None, **kwargs: None):
        qs = Artist.objects.all()
        serialized = ArtistSerializer(qs, many=True)
        return Response(serialized.data)


class SongAPIView(APIView):
    def get(self, *args: None, **kwargs: None):
        qs = Song.objects.all()
        serialized = SongSerializer(qs, many=True)
        return Response(serialized.data)
