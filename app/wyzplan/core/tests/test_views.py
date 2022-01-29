from http import HTTPStatus

from django.template.exceptions import TemplateDoesNotExist
from django.test import TestCase, override_settings
from django.urls import reverse


class RobotsTxtTests(TestCase):
    def test_get(self):

        robots_txt_configs = [
            ['User-Agent: *', 'Disallow: /'],
            ['User-Agent: *', 'Allow: /'],
        ]

        for robots_txt in robots_txt_configs:
            with override_settings(ROBOTS_TXT_RULES=robots_txt):
                with self.subTest(rule=robots_txt[1]):
                    response = self.client.get("/robots.txt")

                    self.assertEqual(response.status_code, HTTPStatus.OK)
                    self.assertEqual(response["content-type"], "text/plain")
                    lines = response.content.decode().splitlines()
                    self.assertEqual(robots_txt[0], lines[0])
                    self.assertEqual(robots_txt[1], lines[1])
                    self.assertEqual('Sitemap: http://testserver/sitemap.xml', lines[2])

    def test_post_disallowed(self):
        response = self.client.post("/robots.txt")

        self.assertEqual(HTTPStatus.METHOD_NOT_ALLOWED, response.status_code)


class FrontendAppViewTest(TestCase):
    def test_url_route(self):
        self.assertEqual('/', reverse('frontend'))

    def test_get(self):
        try:
            r = self.client.get(reverse('frontend'))
        except TemplateDoesNotExist:
            self.fail('index.html missing. Build the front end once before running tests')
        self.assertEqual(200, r.status_code)
        self.assertInHTML(
            '<noscript>You need to enable JavaScript to run this app.</noscript>', r.content.decode('utf-8')
        )
        self.assertInHTML('<div id="root"></div>', r.content.decode('utf-8'))
