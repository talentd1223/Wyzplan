import factory

from wyzplan.accounts.models import Account, Institution
from wyzplan.users.factories import UserFactory


class InstitutionFactory(factory.django.DjangoModelFactory):

    name = factory.Sequence(lambda n: f'Account {n}')
    user = factory.SubFactory(UserFactory)

    class Meta:
        model = Institution


class AccountFactory(factory.django.DjangoModelFactory):

    name = factory.Sequence(lambda n: f'Account {n}')
    user = factory.SubFactory(UserFactory)
    # SelfAttribute passed into SubFactory is not super clear syntax
    # https://factoryboy.readthedocs.io/en/stable/reference.html?highlight=SelfAttribute#parents
    # institution = factory.SubFactory(InstitutionFactory, user=factory.SelfAttribute('..user'))
    institution = factory.SubFactory(InstitutionFactory, user=factory.SelfAttribute('..user'))
    account_type = 'FAKE'  # until we have known types

    class Meta:
        model = Account
