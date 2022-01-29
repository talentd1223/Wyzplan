from django.test import SimpleTestCase, TestCase

from wyzplan.users.models import User, UserManager


class UserTest(SimpleTestCase):
    def test_get_full_name(self):

        # first name, last name, expected output
        # we could just use first and last and the test concatenate and .strip() them
        # but this makes what is expected more obvious
        name_pairs = [
            ('first', 'last', 'first last'),
            ('', 'last', 'last'),
            ('first', '', 'first'),
        ]

        for first, last, expected in name_pairs:
            with self.subTest(first_name=first, last_name=last):
                u = User(first_name=first, last_name=last, email='fake@example.com')
                self.assertEqual(expected, u.get_full_name())

    def test_get_short_name(self):

        # first name, last name, expected output
        # we could just use first and last and the test concatenate and .strip() them
        # but this makes what is expected more obvious
        name_pairs = [
            ('first', 'last', 'first'),
            ('', 'last', ''),
            ('first', '', 'first'),
        ]

        for first, last, expected in name_pairs:
            with self.subTest(first_name=first, last_name=last):
                u = User(first_name=first, last_name=last, email='fake@example.com')
                self.assertEqual(expected, u.get_short_name())

    def test__str__(self):
        for email in ['user@example.com', 'user2@example.com']:
            with self.subTest(email=email):
                u = User(first_name='', last_name='', email=email)
                # normally not called directly, but as a result of direct string interpolation
                # such as f'{u}' or str(u)
                self.assertEqual(email, u.__str__())

    def test_default_manager(self):

        self.assertIsInstance(User.objects, UserManager)


class UserManagerTest(TestCase):
    def test_create_user(self):
        """
        Call create_user() with default is_staff and is_superuser values
        """
        user = User.objects.create_user(email='user@example.com', password='p', first_name='first', last_name='last')
        self.assertIsNotNone(user.pk)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertEqual('user@example.com', user.email)
        self.assertEqual('first', user.first_name)
        self.assertEqual('last', user.last_name)

    def test_create_user_requires_email(self):
        """
        Call create_user() with default is_staff and is_superuser values
        """
        with self.assertRaises(ValueError):
            # email is a required arg, so it must be passed, but make sure things behave when a falsey value is passed
            User.objects.create_user(email='', password='p', first_name='first', last_name='last')

    def test_create_superuser(self):
        """
        Call create_user() with default is_staff and is_superuser values
        """
        user = User.objects.create_superuser(
            email='user@example.com', password='p', first_name='first', last_name='last'
        )
        self.assertIsNotNone(user.pk)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertEqual('user@example.com', user.email)
        self.assertEqual('first', user.first_name)
        self.assertEqual('last', user.last_name)

    def test_create_superuser_requires_email(self):
        """
        Call create_user() with default is_staff and is_superuser values
        """
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email='', password='p', first_name='first', last_name='last')
