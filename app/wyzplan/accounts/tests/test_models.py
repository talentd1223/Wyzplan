from django.test import SimpleTestCase

from wyzplan.accounts.factories import AccountFactory, InstitutionFactory


class AccountModelTest(SimpleTestCase):
    def test___str__(self):
        account = AccountFactory.build()
        self.assertEqual(account.name, account.__str__())


class InstitutionModelTest(SimpleTestCase):
    def test___str__(self):
        institution = InstitutionFactory.build()
        self.assertEqual(institution.name, institution.__str__())
