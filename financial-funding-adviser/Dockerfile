FROM python:3.10.12

WORKDIR /app

COPY . .

RUN cd server && pip install -r requirements.txt

ENV FLASK_APP="app"

EXPOSE 8000

WORKDIR /app/server

# Bind to both IPv4
ENV GUNICORN_CMD_ARGS="--bind=0.0.0.0:8000 --workers=2"

# replace APP_NAME with module name
CMD ["gunicorn", "wsgi:app"]