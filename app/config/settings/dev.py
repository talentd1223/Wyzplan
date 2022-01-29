import structlog

from .base import *

DEBUG = True
DEBUG_TOOLBAR_CONFIG = {'SHOW_TOOLBAR_CALLBACK': lambda request: True}

DJANGO_MAILVIEWER_ENABLED = True
EMAIL_BACKEND = 'django_mail_viewer.backends.cache.EmailBackend'
SECRET_KEY = 'fake'

# Optiojnally move django-mail-viewer to requirements.in from requirements.dev.in to install all the time
# and pop this into INSTALLED_APPS in base.py. Features are coming in the near future which can make this useful
# in staging environments.
INSTALLED_APPS += [
    'django_mail_viewer',
]

LOGGING = {
    'version': 1,
    # 'disable_existing_loggers': True,
    'disable_existing_loggers': False,
    'root': {
        'level': 'INFO',
        'handlers': ['console_key_value'],
    },
    'formatters': {
        'verbose': {'format': '%(levelname)s %(asctime)s %(module)s ' '%(process)d %(thread)d %(message)s'},
        "json_formatter": {
            "()": structlog.stdlib.ProcessorFormatter,
            "processor": structlog.processors.JSONRenderer(),
        },
        "plain_console": {"()": structlog.stdlib.ProcessorFormatter, "processor": structlog.dev.ConsoleRenderer()},
        "key_value": {
            "()": structlog.stdlib.ProcessorFormatter,
            "processor": structlog.processors.KeyValueRenderer(key_order=['timestamp', 'level', 'event', 'logger']),
        },
    },
    'handlers': {
        'console_json': {'level': 'DEBUG', 'class': 'logging.StreamHandler', 'formatter': 'json_formatter'},
        'console_plain': {'level': 'DEBUG', 'class': 'logging.StreamHandler', 'formatter': 'plain_console'},
        'console_key_value': {'level': 'DEBUG', 'class': 'logging.StreamHandler', 'formatter': 'key_value'},
    },
    'loggers': {
        'django': {'level': 'INFO', 'handlers': ['console_key_value'], 'propagate': False},
        'django.request': {'handlers': ['console_key_value'], 'level': 'DEBUG', 'propagate': False},
        'django.server': {'handlers': ['console_key_value'], 'level': 'DEBUG', 'propagate': False},
        # Log SQL queries - noisy, but sometimes useful
        # 'django.db.backends': {'handlers': ['console_plain'], 'level': 'DEBUG', 'propagate': False,},
    },
}
