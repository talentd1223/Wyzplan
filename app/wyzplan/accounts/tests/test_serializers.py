# account serializer
# [{'id': 1, 'name': 'Account 0', 'user_id': 1, 'accounts': [], 'plaid_institution_id': ''}]


from django.test import TestCase

from wyzplan.accounts.factories import AccountFactory, InstitutionFactory
from wyzplan.accounts.serializers import AccountSerializer, InstitutionSerializer


class AccountSerializerTest(TestCase):
    def test_serialization(self):
        account = AccountFactory()
        serializer = AccountSerializer(account)
        self.assertEqual(
            {
                'id': account.id,
                'name': account.name,
                'user_id': account.user.id,
                'institution_id': account.institution.id,
                'account_type': account.account_type,
                'account_subtype': account.account_subtype,
                'plaid_account_id': account.plaid_account_id,
            },
            serializer.data,
        )


class InstitutionSerializerTest(TestCase):
    def test_serialization(self):
        institution = InstitutionFactory()
        AccountFactory(institution=institution)
        AccountFactory(institution=institution)

        serializer = InstitutionSerializer(institution)
        self.assertEqual(
            {
                'id': institution.id,
                'name': institution.name,
                'user_id': institution.user.id,
                'accounts': AccountSerializer(institution.accounts.all(), many=True).data,
                'plaid_institution_id': institution.plaid_institution_id,
            },
            serializer.data,
        )

        self.assertEqual(2, len(serializer.data['accounts']))
