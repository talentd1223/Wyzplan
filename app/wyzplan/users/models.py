from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.postgres.fields import CIEmailField
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    """
    A custom user manager for creating users and superusers
    """

    def _create_user(self, email, password, **extra_fields):
        """
        A private method to create the actual user
        """

        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates a user based on the given parameters
        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """
        Creates a super user based on the given parameters
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    A custom user that is setup for using email authentication

    email: The user's email used for login.
    first_name: The user's first name.
    last_name: The user's last name.

    is_staff: If this user is a staff user and can access the admin.
    is_active: If this user account is active and can login.
    date_joined: The date this user joined.

    AbstractBaseUser
    ----------------
    password: The user's hashed password.
    last_login: The last time the user logged in.

    PermissionsMixin
    ----------------
    is_superuser: Designates that this user has all permissions without explicitly assigning them.
    groups: The groups this user belongs to. A user will get all permissions granted to each of their groups.
    user_permissions: Specific permissions for this user.
    """

    email = CIEmailField(unique=True)
    first_name = models.CharField('first name', max_length=30, blank=True)
    last_name = models.CharField('last name', max_length=30, blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def __str__(self):
        return self.email
