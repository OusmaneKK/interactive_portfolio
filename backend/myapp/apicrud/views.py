from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_http_methods
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model


from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from myapp.apicrud.permissions import IsStaffOrAdmin
from myapp.apicrud.serializers import MusicSerializer
from myapp.apicrud.serializers import UserSerializer
from .models import Music, MusicLike
from django.conf import settings
from django.core.mail import send_mail



User = get_user_model()

@require_http_methods(["GET"])
def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'token is invalid'})
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return JsonResponse({'status': 'invalid link'})

class HomeView(generics.ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticated]


class MusicCreateView(generics.CreateAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAdminUser]

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

class UserDetail(generics.RetrieveAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
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

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Seuls les administrateurs peuvent créer de la musique.")
        serializer.save(owner=self.request.user)

class MusicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsStaffOrAdmin]

@login_required
@require_POST
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
    site = get_current_site(request)
    mail_subject = 'Activate your account.'
    message = render_to_string('acc_active_email.html', {
        'user': user,
        'domain': site.domain,
        'uid': uid,
        'token': token,
    })

    email = EmailMessage(
        mail_subject, message, to=[user.email]
    )
    email.send()

class UserRegister(generics.CreateAPIView):
    """
    API endpoint that allows new users to register.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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

        send_verification_email(user, request)

        return Response({'success': 'User created successfully, please check your email to activate your account'}, status=status.HTTP_201_CREATED)

@require_POST
def check_email(request):
    email = request.data.get('email')
    user_exists = User.objects.filter(email=email).exists()
    return JsonResponse({'isUnique': not user_exists})

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    lookup_field = 'pk'  # or 'username' if you want to lookup by username
    permission_classes = [permissions.IsAdminUser]
