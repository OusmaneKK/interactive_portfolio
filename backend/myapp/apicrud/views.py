from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from myapp.apicrud.permissions import IsStaffOrAdmin
from myapp.apicrud.serializers import MusicSerializer
from myapp.apicrud.serializers import UserSerializer
from .models import Music, MusicLike

class UserList(generics.ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        if not username or not email or not password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
class UserDetail(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated & IsAdminUser]

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class MusicList(generics.ListCreateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer): ### faudra peut être enlever
        serializer.save(owner=self.request.user)

class MusicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsStaffOrAdmin]

@login_required
def like_music(request, music_id):
    user = request.user
    music = get_object_or_404(Music, id=music_id)
    try:
        MusicLike.objects.create(user=user, music=music)
    except IntegrityError:
        return JsonResponse({'error': 'Vous avez déjà aimé cette musique'}, status=400)

    return JsonResponse({'success': True})

def send_verification_email(user, request):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    mail_subject = 'Activate your account.'
    message = render_to_string('acc_active_email.html', {
        'user': user,
        'domain': request.META['HTTP_HOST'],
        'uid': uid,
        'token': token,
    })
    to_email = user.email
    email = EmailMessage(mail_subject, message, to=[to_email])
    email.send()


class UserRegister(generics.CreateAPIView):
    """
    API endpoint that allows new users to register.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Ici, nous utilisons AllowAny pour permettre aux utilisateurs non authentifiés de s'inscrire

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        if not username or not email or not password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password, is_staff=False, is_superuser=False)
        return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
