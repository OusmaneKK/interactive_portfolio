FROM python:3.10.8

WORKDIR /backend

RUN apt-get update && apt-get install -y ffmpeg --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN pip install poetry

COPY pyproject.toml /backend/
COPY poetry.lock /backend/

RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

RUN useradd --create-home appuser
RUN mkdir -p /backend/media \
    && chown -R appuser:appuser /backend

USER appuser

COPY manage.py /backend/
COPY myapp /backend/myapp/
COPY tox.ini /backend/

CMD ["gunicorn", "myapp.wsgi:application", "--bind", "0.0.0.0:8000"]
