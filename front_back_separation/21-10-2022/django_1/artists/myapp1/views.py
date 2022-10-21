from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from .models import Artist, Song
from .serializers import ArtistSerializer, SongSerializer

# Create your views here.


class ArtistAPIView(ModelViewSet):
    serializer_class = ArtistSerializer

    def get_queryset(self):
        data = Artist.objects.all()
        filters = {
            "name": self.request.query_params.get("name", None),
            "style": self.request.query_params.get("style", None),
        }
        if filters["name"] is not None:
            data = data.filter(name__icontains=filters["name"])
        if filters["style"] is not None:
            data = data.filter(style__icontains=filters["style"])
        return data


class SongAPIView(ModelViewSet):
    serializer_class = SongSerializer

    def get_queryset(self):
        data = Song.objects.all()
        filters = {
            "title": self.request.query_params.get("title", None),
            "artist": self.request.query_params.get("artist", None),
        }
        if filters["artist"] is not None:
            data = data.filter(artist__name=filters["artist"])
        if filters["title"] is not None:
            data = data.filter(title=filters["title"])
        return data

    @action(detail=False, methods=["get"], url_path="names")
    def get_names(self, request: None):
        return Response({"names": [song.title for song in Song.objects.all()]})
