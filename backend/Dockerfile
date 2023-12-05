FROM python:3.10.8

WORKDIR /backend

RUN apt-get update && apt-get install -y ffmpeg

COPY requirements.txt .

# Installez les dépendances

RUN pip install --no-cache-dir -r requirements.txt

# Copiez votre application dans l'image
COPY . .

# Commande par défaut à exécuter lorsque le conteneur démarre
CMD ["gunicorn", "myapp.wsgi:application", "--bind", "0.0.0.0:8000"]