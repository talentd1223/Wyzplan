#!/bin/bash
set -e
# This script allows us to use the Heroku container based deployments.
# Those do not use heroku.yml and so need 3 images - web, worker, and release, which each
# run the CMD from the Dockerfile and so would require 3 separate Dockerfiles. This
# looks at the dyno type and runs the correct command, allowing us to have a single Dockerfile
# and single base image and then just tag the image appropriately before pushing to heroku container registry.

echo "Dyno is: $DYNO"
if [[ "$DYNO" =~ ^release.* ]]; then
    python3 manage.py migrate
elif [[ "$DYNO" =~ ^web.* ]]; then
    gunicorn --log-file=- --worker-class=gthread --threads=${GUNICORN_THREADS:-4} --timeout=30 --bind=0.0.0.0:$PORT config.wsgi:application
else
    python manage.py qcluster
fi
