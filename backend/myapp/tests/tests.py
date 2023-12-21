import pytest

from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from django.contrib.auth.models import User
from myapp.apicrud.models import Music
from myapp.apicrud.serializers import MusicSerializer
from rest_framework import status
from rest_framework.test import APIClient
from django.test import RequestFactory  # Importation modifiée
from pydub import AudioSegment
from unittest.mock import MagicMock, patch


@pytest.mark.django_db
class TestSimple:
    @pytest.fixture(autouse=True)
    def setup(self, db):
        self.user = User.objects.create_user(username='testuser', password='12345')

    def test_home_page_status_code(self, client):
        client.login(username='testuser', password='12345')

        response = client.get(reverse('home'))

        assert response.status_code == 200

@pytest.mark.django_db
def test_music_serializer():
    user = User.objects.create_user(username='testuser', password='12345')
    client = APIClient()
    client.force_authenticate(user=user)

    image = Image.new('RGB', (100, 100))
    image_file = BytesIO()
    image.save(image_file, format='JPEG')
    image_file.name = 'test.jpg'
    image_file.seek(0)
    uploaded_image = SimpleUploadedFile(name='./test.jpg', content=image_file.getvalue(), content_type='image/jpeg')

    audio_content = b"fake audio content"
    uploaded_audio = SimpleUploadedFile('./fake.mp3', audio_content, content_type="audio/mp3")

    data = {
        'title': 'Test Music',
        'image': uploaded_image,
        'audio_file': uploaded_audio
    }

    # Création d'une fausse requête
    request_factory = RequestFactory()
    request = request_factory.get('/fake-url')
    request.user = user

    # Contexte pour le sérialiseur
    context = {'request': request}

    # Mock pydub.AudioSegment.from_file
    with patch('pydub.AudioSegment.from_file', return_value=MagicMock()):
        serializer = MusicSerializer(data=data, context=context)
        assert serializer.is_valid(), serializer.errors
        music = serializer.save()

        assert music.title == 'Test Music'
        assert music.duration is not None

@pytest.mark.django_db
def test_music_serializer_without_real_file():
    user = User.objects.create_user(username='testuser', password='12345')

    # Simuler un fichier uploadé pour l'image
    image = Image.new('RGB', (100, 100))
    image_file = BytesIO()
    image.save(image_file, format='JPEG')
    image_file.seek(0)

    # Simuler un fichier uploadé pour l'image
    image_mock = MagicMock(spec=SimpleUploadedFile)
    image_mock.name = 'test.jpg'
    image_mock.content_type = 'image/jpeg'
    image_mock.read.return_value = image_file.read()

    # Reset le pointeur pour la prochaine lecture
    image_file.seek(0)

    # Simuler un fichier uploadé pour l'audio
    audio_mock = MagicMock(spec=SimpleUploadedFile)
    audio_mock.name = 'fake.mp3'
    audio_mock.content_type = 'audio/mp3'
    audio_mock.read.return_value = b'fake_audio_content'

    data = {
        'title': 'Test Music',
        'image': image_mock,
        'audio_file': audio_mock
    }

    request_factory = RequestFactory()
    request = request_factory.get('/fake-url')
    request.user = user
    context = {'request': request}

    with patch('pydub.AudioSegment.from_file', return_value=MagicMock()):
        serializer = MusicSerializer(data=data, context=context)
        assert serializer.is_valid(), serializer.errors
        music = serializer.save()

        assert music.title == 'Test Music'
        assert music.duration is not None
