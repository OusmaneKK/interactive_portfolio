from datetime import timedelta
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Music, MusicLike, Achievements
from pydub import AudioSegment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'is_superuser')

class MusicSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    created = serializers.DateTimeField(read_only=True)
    title = serializers.CharField(max_length=100)
    duration = serializers.DurationField(required=False)
    date_added = serializers.DateField(read_only=True)
    image = serializers.ImageField()
    audio_file = serializers.FileField()
    like_count = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source='owner.username')

    @property
    def like_count(self):
        return self.musiclike_set.count()

    def create(self, validated_data):
        audio_file = validated_data.get('audio_file')

        # Sauvegardez le fichier temporaire en utilisant le système de stockage par défaut
        path = default_storage.save('media/' + audio_file.name, ContentFile(audio_file.read()))

        audio = AudioSegment.from_file(path)
        validated_data['duration'] = timedelta(milliseconds=len(audio))

        # Supprimez le fichier temporaire si nécessaire
        default_storage.delete(path)

        owner = self.context['request'].user
        validated_data['owner'] = owner


        return Music.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.image = validated_data.get('image', instance.image)
        instance.audio_file = validated_data.get('audio_file', instance.audio_file)
        instance.likes = validated_data.get('likes', instance.likes)
        instance.save()
        return instance

class MusicLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicLike
        fields = ['id', 'user', 'music', 'timestamp']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_id'] = user.id

        return token

class AchievementsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    title = serializers.CharField(max_length=100)
    description = serializers.CharField()
    image = serializers.ImageField()
    timestamp = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Achievements.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
