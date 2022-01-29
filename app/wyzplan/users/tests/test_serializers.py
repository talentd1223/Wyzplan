from django.test import TestCase

from rest_framework.serializers import ErrorDetail

from wyzplan.users.factories import UserFactory
from wyzplan.users.serializers import UserSerializer


class UserSerializerTest(TestCase):
    def test_serialization(self):
        """
        Test the data for when an object is serialized
        """
        user = UserFactory()
        serializer = UserSerializer(user)
        # We are mostly looking to ensure that the fields we expect are here and that the data
        # matches our user
        self.assertEqual(
            {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            serializer.data,
        )

    def test_validation(self):
        serializer = UserSerializer(data={})
        self.assertFalse(serializer.is_valid())

        self.assertEqual(
            {
                'email': [ErrorDetail(string='This field is required.', code='required')],
            },
            serializer.errors,
        )
