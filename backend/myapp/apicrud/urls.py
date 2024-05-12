from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from myapp.apicrud import views
from .views import HomeView, UserDeleteView, AchievementsList, AchievementsDetail

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('musics/', views.MusicList.as_view()),
    path('musics/<int:pk>/', views.MusicDetail.as_view()),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('users/me/', views.CurrentUserView.as_view()),
    path('delete-user/<int:pk>/', UserDeleteView.as_view(), name='delete-user'),
    path('like_music/<int:music_id>/', views.like_music, name='like_music'),
    path('register/', views.UserRegister.as_view(), name='user-register'),
    path('api/check-email', views.check_email, name='check_email'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('achievements', views.AchievementsList.as_view(), name='achievements-list'),
    path('achievements/<int:pk>/', views.AchievementsDetail.as_view(), name='achievements-detail'),


]

urlpatterns = format_suffix_patterns(urlpatterns)
