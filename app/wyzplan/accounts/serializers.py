from rest_framework import serializers

from wyzplan.accounts.models import Account, Institution


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'id',
            'name',
            'user_id',
            'institution_id',
            'name',
            'account_type',
            'account_subtype',
            'plaid_account_id',
        )


class InstitutionSerializer(serializers.ModelSerializer):
    accounts = AccountSerializer(many=True, read_only=True)

    class Meta:
        model = Institution
        fields = ('id', 'name', 'user_id', 'accounts', 'plaid_institution_id')
