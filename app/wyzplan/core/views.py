from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.http import require_GET
from django.views.generic import TemplateView

import structlog

logger = structlog.getLogger(__name__)


class FrontendAppView(TemplateView):
    """
    Serve the index.html built by webpack/create react app
    """

    template_name = 'index.html'


@require_GET
def robots_txt(request):
    """
    Serve up a robots.txt with a very simple configuration from settings
    Based on https://adamj.eu/tech/2020/02/10/robots-txt/
    """

    # We could go fancier here and use a dict of user-agents as keys, with dicts of allow/deny rules as the value
    # ROBOTS_TXT_RULES = {
    #  '*': {
    #    'Allow': ['*'],
    #    'Deny': ['/notallowed']
    #  }
    # }
    # but keep it simple for now. Also considering django-robots package if more flexibility is needed
    lines = settings.ROBOTS_TXT_RULES[:]
    host = request.get_host()
    protocol = 'https' if request.is_secure() else 'http'
    sitemap_url = f'{protocol}://{host}/sitemap.xml'
    lines.append(f'Sitemap: {sitemap_url}')
    return HttpResponse("\n".join(lines), content_type="text/plain")
