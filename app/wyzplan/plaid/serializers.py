from rest_framework import serializers


class PlaidBalanceSerializer(serializers.Serializer):
    available = serializers.FloatField()
    current = serializers.FloatField()
    limit = serializers.FloatField()
    iso_currency_code = serializers.CharField()
    unofficial_currency_code = serializers.CharField()


class PlaidAccountSerializer(serializers.Serializer):
    account_id = serializers.CharField()
    balances = PlaidBalanceSerializer()
    mask = serializers.CharField()
    name = serializers.CharField()
    official_name = serializers.CharField()
    subtype = serializers.CharField()
    type = serializers.CharField()
