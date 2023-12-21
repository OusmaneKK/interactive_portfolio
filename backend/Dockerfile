FROM python:3.10.8

WORKDIR /backend

RUN apt-get update && apt-get install -y ffmpeg --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN pip install poetry

COPY pyproject.toml poetry.lock* /backend/
# Copiez votre application dans l'image
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

COPY . /backend/

# Commande par défaut à exécuter lorsque le conteneur démarre
CMD ["gunicorn", "myapp.wsgi:application", "--bind", "0.0.0.0:8000"]
