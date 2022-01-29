import factory

from wyzplan.users.models import User


class UserFactory(factory.django.DjangoModelFactory):

    email = factory.Sequence(lambda n: f'user{n}@example.com')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

    class Meta:
        model = User
