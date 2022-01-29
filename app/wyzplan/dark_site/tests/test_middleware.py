from unittest.mock import patch

from django.core.exceptions import MiddlewareNotUsed
from django.http import Http404, HttpResponse
from django.test import TestCase, override_settings
from django.test.client import RequestFactory
from django.urls import path

from waffle.testutils import override_flag

from .. import middleware
from ..middleware import dark_site_middleware

# This is needed for mock.patch. Doing it this way allows this to work
# with no changes when this is in different project specific paths
MIDDLEWARE_MODULE_PATH = middleware.__name__


def simple_view(request, *args, **kwargs):
    return HttpResponse('Ok')


class TestUrls:
    urlpatterns = [path('', simple_view)]


@override_settings(ROOT_URLCONF=TestUrls)
@patch(MIDDLEWARE_MODULE_PATH + '.MIDDLEWARE_ENABLED', False)
class DarkSiteMiddlewareTest(TestCase):
    """
    Test DarkSiteMiddlewareTest when the middleware is disabled
    """

    rf: RequestFactory

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.rf = RequestFactory()

    def test_middleware_enabled_flag(self, *args):
        """
        Test that when the MIDDLEWARE_ENABLED flag is False that it raises MiddlewareNotUsed exception.
        The MiddlewareNotUsed exception causes Django to not even include it in the pipeline which ensures
        it cannot accidentally turn off the site and has a minor performance gain over loading and using it.
        """
        self.rf.get('/')
        with self.assertRaises(MiddlewareNotUsed):
            # Causes the middleware to not even be called in the course of normal responses
            dark_site_middleware(simple_view)


@override_settings(ROOT_URLCONF=TestUrls)
@patch(MIDDLEWARE_MODULE_PATH + '.MIDDLEWARE_ENABLED', True)
class DarkSiteMiddlewareEnabledTest(TestCase):
    """
    Test DarkSiteMiddlewareEnabledTest functionality when it is enabled
    """

    rf: RequestFactory

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.rf = RequestFactory()

    @patch(MIDDLEWARE_MODULE_PATH + '.ALLOWED_PATHS', [])
    @patch(MIDDLEWARE_MODULE_PATH + '.ACCESS_TOKENS', [])
    @override_flag(middleware.WAFFLE_FLAG_NAME, active=False)
    def test_not_allowed(self, *args):
        """
        Test that when the waffle flag is not enabled and the view is not in the ALLOWED_VIEWS
        and no querystring token is provided that the middleware causes an HTTP 404 response
        """
        request = self.rf.get('/')
        with self.assertRaises(Http404):
            dark_site_middleware(simple_view)(request)

    def test_allowed_urls(self, *args):
        with patch(MIDDLEWARE_MODULE_PATH + '.ALLOWED_PATHS', ['/']):
            request = self.rf.get('/')
            response = dark_site_middleware(simple_view)(request)
            self.assertEqual(200, response.status_code)

    def test_access_token(self, *args):
        with patch(MIDDLEWARE_MODULE_PATH + '.ACCESS_TOKENS', ['a']):
            # test with the default token name
            request = self.rf.get('/?dark_site_token=a')
            response = dark_site_middleware(simple_view)(request)
            self.assertEqual(200, response.status_code)

            with patch(MIDDLEWARE_MODULE_PATH + '.ACCESS_TOKEN_NAME', 'token_name'):
                # test that overriding the token name works
                request = self.rf.get('/?token_name=a')
                response = dark_site_middleware(simple_view)(request)
                self.assertEqual(200, response.status_code)

    def test_waffle_flag(self, *args):
        with override_flag(middleware.WAFFLE_FLAG_NAME, active=True):
            request = self.rf.get('/')
            response = dark_site_middleware(simple_view)(request)
            self.assertEqual(200, response.status_code)
