# Utilisez une image Python
FROM python:3.8

# Créez un répertoire de travail
WORKDIR /app

# Copiez le fichier requirements.txt dans l'image
COPY requirements.txt /app/

# Installez les dépendances
RUN pip install -r requirements.txt

# Copiez votre application dans l'image
COPY . /app/

# Commande par défaut à exécuter lorsque le conteneur démarre
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
