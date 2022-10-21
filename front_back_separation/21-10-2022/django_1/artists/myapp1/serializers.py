from rest_framework.serializers import ModelSerializer
from .models import Artist, Song


class SongSerializer(ModelSerializer[Song]):
    artist: ModelSerializer[Artist]
    class Meta:
        model = Song
        fields = '__all__'


class ArtistSerializer(ModelSerializer[Artist]):

    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = ["id", "name", "style", "songs"]
        depth = 1

SongSerializer.artist = ArtistSerializer(read_only=True)