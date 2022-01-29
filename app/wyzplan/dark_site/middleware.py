from typing import Callable

from django.conf import settings
from django.core.exceptions import MiddlewareNotUsed
from django.http import Http404, HttpRequest, HttpResponse

import structlog
import waffle

logger = structlog.getLogger(__name__)

# Access token passed in querystring to more easily allow things like load balancer health checks,
# external sites which we need to allow such as uptime checks, systems which send webhooks or poll
# for API data, etc. to access the site
ACCESS_TOKENS = getattr(settings, 'DARK_SITE_ACCESS_TOKENS', [])
ACCESS_TOKEN_NAME = getattr(settings, 'DARK_SITE_ACCESS_TOKEN_NAME', 'dark_site_token')

# Flag to explicitly enable the middleware. This allows settings.MIDDLEWARE to remain unchanged
# between environments but allows the middleware to still be completely disabled.
# The default is to disable the middleware so that production sites are less easily accidentally
# turned off.
MIDDLEWARE_ENABLED = getattr(settings, 'DARK_SITE_MIDDLEWARE_ENABLED', True)

# Hard code certain allowed paths - login page, etc.
# alternatively, use access tokens to access the login page although
# intelligent usage may mean more complex configuration to allow certain paths to certain tokens
ALLOWED_PATHS = getattr(settings, 'DARK_SITE_ALLOWED_PATHS', [])

WAFFLE_FLAG_NAME = getattr(settings, 'DARK_SITE_FLAG_NAME', 'dark_site_available')


def dark_site_middleware(get_response: Callable) -> Callable:
    # One-time configuration and initialization.
    if not MIDDLEWARE_ENABLED:
        # Django will not even include this middleware in the pipeline which ensures
        # no mistakes can cause it to disable the site
        raise MiddlewareNotUsed()

    def middleware(request: HttpRequest) -> HttpResponse:
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        url_path = request.path
        # Could also set up ALLOWED_PATHS to take names and reverse them
        if url_path in ALLOWED_PATHS:
            logger.info('Dark Site Access Allowed via ALLOWED_PATHS', path=url_path)
            return get_response(request)

        if access_token := request.GET.get(ACCESS_TOKEN_NAME):
            if access_token in ACCESS_TOKENS:
                # Very tempting to log the token and name, but those are secrets which should not be logged
                logger.info('Dark Site Access Allowed via Access Token', path=url_path)
                return get_response(request)

        if waffle.flag_is_active(request, WAFFLE_FLAG_NAME):
            logger.info('Dark Site Access Allowed via Waffle Flag', path=url_path)
            return get_response(request)

        raise Http404()

    return middleware
