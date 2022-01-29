ARG PYTHON_VERSION=3.10.1
ARG DISTRO=bullseye
FROM python:$PYTHON_VERSION-$DISTRO AS base
LABEL maintainer="Justin Michalicek <justin.michalicek@mobelux.com>"
ENV PYTHONUNBUFFERED=1 PYTHONFAULTHANDLER=1

# See https://nodejs.org/en/about/releases/ for picking node versions
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash

RUN DEBIAN_FRONTEND=noninteractive apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --allow-unauthenticated \
  software-properties-common \
  sudo \
  vim \
  telnet \
  apt-transport-https \
  nodejs \
  lsb-release \
  && apt-get autoremove && apt-get clean

RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add - \
  && echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list

RUN DEBIAN_FRONTEND=noninteractive apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --allow-unauthenticated \
  postgresql-client \
  && apt-get autoremove && apt-get clean

# We have had problems with pip version changes, so pin a specific pip version so that an update
# requires manual change once a project is created
RUN pip install pip -U

RUN useradd -ms /bin/bash developer && echo "developer ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

WORKDIR /app
RUN chown developer /app
USER developer

ENV HOME=/home/developer \
  PATH=/app/.venv/bin:/home/developer/.local/bin:/app/node_modules/.bin:$PATH \
  LC_ALL=C.UTF-8 \
  LANG=C.UTF-8 \
  PYTHONIOENCODING=utf-8

EXPOSE 8000


FROM base AS build
RUN python -m venv /app/.venv
# https://stackoverflow.com/a/28210626
# python -m venv only copies the bundled pip, even if you've done a pip install -U pip to get
# a newer version installed, so update it in the virtualenv
# We have had problems with pip version changes, so pin a specific pip version so that an update
# requires manual change once a project is created
RUN pip install pip pip-tools -U
COPY --chown=developer ./app/requirements.txt ./app/requirements.dev.txt /app/
RUN pip-sync requirements.txt requirements.dev.txt

RUN mkdir -p /app/frontend/
COPY --chown=developer ./app/frontend /app/frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build
WORKDIR /app

COPY --chown=developer ./app /app
RUN DJANGO_SECRET_KEY=fake DJANGO_SETTINGS_MODULE=config.settings.production python manage.py collectstatic --noinput -i *.scss
# remove no longer needed files plus a bit of extra jiggling things around due to create-react-app and where
# it places things to make it all work well with django and whitenoise serving everything up
RUN rm -rf /app/static_collected/static
RUN mv /app/frontend/build/* /app/static_collected/
RUN mv /app/static_collected/index.html /app/config/templates/index.html
RUN rm -rf /app/frontend

FROM python:$PYTHON_VERSION-slim-$DISTRO AS prod
RUN DEBIAN_FRONTEND=noninteractive apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  curl \
  apt-transport-https \
  make \
  libpq5 \
  && DEBIAN_FRONTEND=noninteractive apt-get autoremove && DEBIAN_FRONTEND=noninteractive apt-get clean

RUN useradd -m developer
COPY --chown=developer --from=build /app /app/
USER developer

ENV HOME=/home/developer \
  PATH=/app/.venv/bin:/app/node_modules/.bin:/home/developer/.local/bin:$PATH \
  LC_ALL=C.UTF-8 \
  LANG=C.UTF-8 \
  PYTHONIOENCODING=utf-8 \
  PYTHONUNBUFFERED=1 \
  PYTHONFAULTHANDLER=1
WORKDIR /app
EXPOSE 8000
CMD ["./heroku_start.sh"]
