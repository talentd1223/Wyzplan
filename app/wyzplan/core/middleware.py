import urllib.parse

from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin

import dateutil.tz
import structlog

logger = structlog.getLogger(__name__)


class TimezoneMiddleware(MiddlewareMixin):
    """
    Middleware to set the timezone based on browser cookie.

    The Browser cookie should be set by the browser after detecting the timezone.

    Javascript to set this is included by default in main.js
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    """

    def process_request(self, request):
        if browser_tz := request.COOKIES.get('browser.timezone'):
            # can we skip the if and just have the try/except?
            try:
                timezone.activate(dateutil.tz.gettz(urllib.parse.unquote(browser_tz)))
            except ValueError:
                timezone.deactivate()
        else:
            timezone.deactivate()
