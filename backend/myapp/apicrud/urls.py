from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from myapp.apicrud import views
from .views import HomeView

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('musics/', views.MusicList.as_view()),
    path('musics/<int:pk>/', views.MusicDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('users/me/', views.CurrentUserView.as_view()),
    path('like_music/<int:music_id>/', views.like_music, name='like_music'),
    path('register/', views.UserRegister.as_view(), name='user-register'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
