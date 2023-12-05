import io

from datetime import timedelta
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models
from pydub import AudioSegment

# Create your models here.

class Music(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    duration = models.DurationField(blank=True, null=True)
    date_added = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='music_images/')
    audio_file = models.FileField(upload_to='music_audio/')
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)

    class Meta:
        app_label = 'apicrud'
        ordering = ['created']
    
    @property
    def like_count(self):
        return self.music_likes.count()
    
    def save(self, *args, **kwargs):
        audio = AudioSegment.from_file(self.audio_file.path)
        self.duration = timedelta(milliseconds=len(audio))
        if self.id is None:
            super().save(*args, **kwargs)  # Save once to generate ID if it doesn't exist
        else:
            super().save(*args, **kwargs)  # Regular save for updates


class MusicLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    music = models.ForeignKey(Music, related_name='music_likes', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'apicrud'
        unique_together = ('user', 'music')
