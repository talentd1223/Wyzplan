from django.db import models

from wyzplan.users.models import User


class Institution(models.Model):
    """
    A financial institution belonging to a Wyzplan User.  Optionally
    includes access token and identifiers for linked Plaid Items.

    user: The user this institution belongs to.
    name: Institution name.
    plaid_institution_id: Plaid Institution ID, if linked
    plaid_access_token: Plaid Access Token, if linked
    """

    user = models.ForeignKey(User, related_name='institutions', on_delete=models.CASCADE)
    name = models.CharField('name', max_length=255, blank=False)
    plaid_institution_id = models.CharField('plaid_institution_id', max_length=255, blank=True)
    plaid_access_token = models.CharField('plaid_access_token', max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Account(models.Model):
    """
    Financial account for a Wyzplan User.

    user: The user this account belongs to.
    institution: The institution this account belongs to.
    name: Account name.
    account_type: Account type.
    account_subtype: Account subtype.
    plaid_account_id: Plaid Account ID, if linked.
    """

    user = models.ForeignKey(User, related_name='accounts', on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, related_name='accounts', on_delete=models.CASCADE)
    name = models.CharField('name', max_length=255, blank=False)
    account_type = models.CharField('account_type', max_length=255, blank=False)  # TODO: type set validation
    account_subtype = models.CharField('account_subtype', max_length=255, blank=True, default='')  # TODO: subtype set validation
    plaid_account_id = models.CharField('plaid_account_id', max_length=255, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
