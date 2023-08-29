from django.db import models

# Create your models here.
class Music(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    is_liked = models.BooleanField(default=False)
    like_count = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='music_images/')
    audio_file = models.FileField(upload_to='music_audio/')

    def __str__(self):
        return self.title