from .base import *

SECRET_KEY = 'fake'

# faster password hashing in tests.
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'filters': {'silent': {'()': lambda: False}},
    'handlers': {'console': {'class': 'logging.StreamHandler', 'filters': ['silent']},},
    'root': {'handlers': [], 'level': 'CRITICAL',},
}
# This seems to be required to silence django-q logging every time it enqueues a task during tests.
# logging.disable(logging.CRITICAL)


# makes it so that running collectstatic is not required for whitenoise to work.
# when DEBUG=True this value is also true, but in tests DEBUG=False so explicitly set it here.
# https://whitenoise.evans.io/en/stable/django.html#WHITENOISE_USE_FINDERS
WHITENOISE_USE_FINDERS = True
# Similarly tied to DEBUG=True by default. Setting this to True prevents slow scanning of staticfiles before starting tests.
# https://whitenoise.evans.io/en/stable/django.html#WHITENOISE_AUTOREFRESH
WHITENOISE_AUTOREFRESH = True
# https://whitenoise.evans.io/en/stable/django.html#WHITENOISE_MANIFEST_STRICT
WHITENOISE_MANIFEST_STRICT = False
# the above SHOULD keep whitenoise from blowing up running tests when collectstatic has not been run, but it is not.
# so just turn off whitenoise for now
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# For django_coverage_plugin
TEMPLATES[0]['OPTIONS']['debug'] = True  # type: ignore
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
DEFAULT_FILE_STORAGE = "inmemorystorage.InMemoryStorage"

CORS_ALLOW_ALL_ORIGINS = True
