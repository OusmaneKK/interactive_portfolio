import uuid
import tempfile
import pytest


from base64 import urlsafe_b64encode
from django.urls import reverse
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from django.contrib.auth.models import User
from myapp.apicrud.models import Music
from myapp.apicrud.serializers import MusicSerializer
from rest_framework import status
from rest_framework.test import APIClient
from django.test import RequestFactory
from pydub import AudioSegment
from unittest.mock import MagicMock, patch
from django.conf import settings
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator


@pytest.fixture
def api_client():
    username = 'testuser' + str(uuid.uuid4())
    user = User.objects.create_user(username=username, password='12345') #NOSONAR
    client = APIClient()
    client.force_authenticate(user=user)
    return client

@pytest.mark.django_db
def test_home_page_status_code(api_client):
    api_client.login(username='testuser', password='12345') #NOSONAR

    response = api_client.get(reverse('home'))

    assert response.status_code == 200

@pytest.mark.django_db
def test_music_serializer():

    user = User.objects.create_user(username='testuser', password='12345') #NOSONAR
    client = APIClient()
    client.force_authenticate(user=user)

    with tempfile.TemporaryDirectory() as tmp_media_root:
        settings.MEDIA_ROOT = tmp_media_root
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
    user = User.objects.create_user(username='testuser', password='12345') #NOSONAR


    with tempfile.TemporaryDirectory() as tmp_media_root:
        settings.MEDIA_ROOT = tmp_media_root
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

@pytest.mark.django_db
def test_activate_view(api_client):
    user = User.objects.create_user(username='testuser', password='12345', is_active=False) #NOSONAR
    uid = urlsafe_b64encode(force_bytes(user.pk)).decode()  # Ajoutez .decode() ici
    token = default_token_generator.make_token(user)

    response = api_client.get(reverse('activate', kwargs={'uidb64': uid, 'token': token}))

    assert response.status_code == 200
    assert response.json()['status'] == 'success'

    user.refresh_from_db()
    assert user.is_active

@pytest.mark.django_db
def test_user_list_view(api_client):
    initial_user_count = User.objects.count()

    User.objects.create_user(username='testuser1', password='12345') #NOSONAR
    User.objects.create_user(username='testuser2', password='12345') #NOSONAR
    api_client.force_authenticate(user=User.objects.first())

    response = api_client.get(reverse('user-list'))

    assert response.status_code == 200
    assert response.data['count'] == initial_user_count + 2

@pytest.mark.django_db
def test_user_detail_view(api_client):
    user = User.objects.create_superuser(username='testuser', password='12345')  #NOSONAR
    api_client.force_authenticate(user=user)

    response = api_client.get(reverse('user-detail', kwargs={'pk': user.pk}))

    assert response.status_code == 200
    assert response.data['username'] == 'testuser'

@pytest.mark.django_db
def test_user_delete_view(api_client):
    user_to_delete = User.objects.create_user(username='testuser', password='12345') #NOSONAR
    admin_user = User.objects.create_superuser(username='admin', password='12345')  #NOSONAR
    api_client.force_authenticate(user=admin_user)  # Utilisez le superutilisateur pour l'authentification


    initial_user_count = User.objects.count()

    response = api_client.delete(reverse('delete-user', kwargs={'pk': user_to_delete.pk}))

    assert response.status_code == 204
    assert User.objects.count() == initial_user_count - 1

@pytest.mark.django_db
def test_user_register_view(api_client):
    data = {
        'username': 'testuser',
        'email': '',
        'password': '12345' #NOSONAR
    }
    response = api_client.post(reverse('user-register'), data)

    assert response.status_code == 400
    assert response.json()['error'] == 'All fields are required'
