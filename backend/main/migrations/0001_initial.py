# Generated by Django 4.2.3 on 2023-08-28 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Music',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('is_liked', models.BooleanField(default=False)),
                ('like_count', models.PositiveIntegerField(default=0)),
                ('image', models.ImageField(upload_to='music_images/')),
                ('audio_file', models.FileField(upload_to='music_audio/')),
            ],
        ),
    ]
