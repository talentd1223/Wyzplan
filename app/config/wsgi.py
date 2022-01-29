"""
WSGI config for Wyzplan project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""
# The above django version used to come from a cookiecutter input, but let's just keep it simple for now and have one less input
# developers need to enter to set up the project. This can be changed later here if/when it matters

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
