from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Enregistre le modèle User avec la configuration par défaut de UserAdmin
admin.site.register(User, UserAdmin)
