import json

from django.urls import reverse

from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.test import APITestCase

from wyzplan.users.factories import UserFactory
from wyzplan.users.serializers import UserSerializer


class CurrentUserAPIViewTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.user = UserFactory()
        cls.user_2 = UserFactory()

    def test_url_reverse(self):
        self.assertEqual('/api/users/current_user/', reverse('users:current_user'))

    def test_not_authenticated(self):
        self.client.logout()
        r = self.client.get(reverse('users:current_user'))
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, r.status_code)

    def test_authenticated_user(self):

        for user in [self.user, self.user_2]:

            with self.subTest(user=self.user):
                self.client.force_login(user=user)
                s = UserSerializer(user)
                r = self.client.get(reverse('users:current_user'))
                self.assertEqual(status.HTTP_200_OK, r.status_code)
                self.assertEqual(json.loads(JSONRenderer().render(data=s.data)), r.json())
