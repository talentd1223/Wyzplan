import json

from django.urls import reverse

from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.test import APITestCase

from wyzplan.accounts.factories import AccountFactory, InstitutionFactory
from wyzplan.accounts.serializers import AccountSerializer, InstitutionSerializer
from wyzplan.users.factories import UserFactory


class InstitutionListAPIView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.user_1 = UserFactory()
        cls.user_2 = UserFactory()
        InstitutionFactory(user=cls.user_1)

    def test_url_reverse(self):
        self.assertEqual('/api/accounts/institutions/', reverse('accounts:institutions_list'))

    def test_get(self):

        for user in [self.user_1, self.user_2]:
            with self.subTest(user=user):
                self.client.force_login(user=user)
                r = self.client.get(reverse('accounts:institutions_list'))
                s = InstitutionSerializer(user.institutions.all(), many=True)
                self.assertEqual(status.HTTP_200_OK, r.status_code)

                self.assertEqual(
                    json.loads(JSONRenderer().render(data=s.data)),
                    r.json(),
                )

    def test_post(self):
        self.client.force_login(user=self.user_1)
        r = self.client.post(reverse('accounts:institutions_list'), {}, format='json')
        self.assertEqual(status.HTTP_405_METHOD_NOT_ALLOWED, r.status_code)


class AccountDetailAPIView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.account_1 = AccountFactory()
        cls.account_2 = AccountFactory()

    def test_url_reverse(self):
        for account in [self.account_1, self.account_2]:
            with self.subTest(account=account):
                self.assertEqual(
                    f'/api/accounts/{account.id}/', reverse('accounts:account_detail', kwargs={'pk': account.id})
                )

    def test_not_authenticated(self):
        self.client.logout()
        r = self.client.get(reverse('accounts:account_detail', kwargs={'pk': 1}))
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, r.status_code)

    def test_get_as_authenticated_user(self):
        for account in [self.account_1, self.account_2]:
            with self.subTest(account=account):
                self.client.force_login(user=account.user)
                s = AccountSerializer(account)
                r = self.client.get(reverse('accounts:account_detail', kwargs={'pk': account.id}))
                self.assertEqual(status.HTTP_200_OK, r.status_code)
                self.assertEqual(json.loads(JSONRenderer().render(data=s.data)), r.json())

    def test_get_other_users_account(self):
        """
        Try to get the account details for an account owned by another user. Should return 404
        """
        # we could get fancier with permissions and not 404, but 404 is easy and adds a bit of security through obscurity
        self.client.force_login(self.account_1.user)
        r = self.client.get(reverse('accounts:account_detail', kwargs={'pk': self.account_2.id}))
        self.assertEqual(status.HTTP_404_NOT_FOUND, r.status_code)

    def test_put(self):
        """
        Test that endpoint is read only and does not currently allow updating the data
        """
        self.client.force_login(user=self.account_1.user)
        r = self.client.put(reverse('accounts:account_detail', kwargs={'pk': self.account_1.id}), {}, format='json')
        self.assertEqual(status.HTTP_405_METHOD_NOT_ALLOWED, r.status_code)
