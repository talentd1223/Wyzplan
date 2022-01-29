from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

import debug_toolbar
import structlog
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from wyzplan.core.views import FrontendAppView, robots_txt

logger = structlog.getLogger(__name__)

urlpatterns = [
    path('robots.txt', robots_txt, name='robots-txt'),
    path('djangoadmin/', admin.site.urls),
    path('api/accounts/', include('wyzplan.accounts.urls')),
    path('api/users/', include('wyzplan.users.urls')),
    path('api/plaid/', include('wyzplan.plaid.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('404/', TemplateView.as_view(template_name='404.html'), name='404'),
    path('500/', TemplateView.as_view(template_name='500.html'), name='500'),
    path('__debug__/', include(debug_toolbar.urls)),
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)  # type: ignore

if settings.DJANGO_MAILVIEWER_ENABLED:
    # logger.info("Enabling mailviewer urls and /mailviewer")
    urlpatterns += [
        path("mailviewer/", include("django_mail_viewer.urls")),
    ]


# Catch all for anything else, so this route must be last
urlpatterns += [
    re_path(r'^.*/$', FrontendAppView.as_view()),
    path('', FrontendAppView.as_view(), name='frontend'),
]
