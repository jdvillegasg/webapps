FROM python:slim-buster

WORKDIR /app

COPY --link server  /app/server
COPY --link frontend/dist /app/frontend/dist

RUN cd server && pip install -r requirements.txt

ENV FLASK_APP="app"

EXPOSE 8000

# Bind to both IPv4
ENV GUNICORN_CMD_ARGS="--bind=0.0.0.0:8000 --workers=2"

# replace APP_NAME with module name
CMD ["gunicorn", "wsgi:app"]