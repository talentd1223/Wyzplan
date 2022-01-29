from django.conf import settings
from django.http import JsonResponse

import plaid
from plaid.api import plaid_api
from plaid.model.accounts_get_request import AccountsGetRequest
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.products import Products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from wyzplan.accounts.models import Account, Institution
from wyzplan.accounts.serializers import InstitutionSerializer
from wyzplan.plaid.serializers import PlaidAccountSerializer


# utility method returning Plaid API client
def get_plaid_client():
    plaid_config = plaid.Configuration(
        host=getattr(plaid.Environment, settings.PLAID_ENV),
        api_key={
            'clientId': settings.PLAID_CLIENT_ID,
            'secret': settings.PLAID_SECRET,
            'plaidVersion': '2020-09-14',
        },
    )
    api_client = plaid.ApiClient(plaid_config)
    return plaid_api.PlaidApi(api_client)


# retrieve a temporary Plaid link_token that js client can exchange for a public_token
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_link_token(request) -> JsonResponse:
    client = get_plaid_client()
    user = request.user
    token_request = LinkTokenCreateRequest(
        products=list(map(Products, settings.PLAID_PRODUCTS)),
        client_name="Wyzvest",  # TODO: Can we change this to Wyzplan safely?
        country_codes=list(map(CountryCode, settings.PLAID_COUNTRY_CODES)),
        language='en',
        user=LinkTokenCreateRequestUser(client_user_id=str(user.id)),
    )
    # create link token
    response = client.link_token_create(token_request)
    return JsonResponse({'link_token': response['link_token']})


# accepts Plaid Link response data for a single institution, converting the
# public_token into a permanent access_token and creating new Account records
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def link_item(request) -> Response:
    client = get_plaid_client()
    exchange_request = ItemPublicTokenExchangeRequest(public_token=request.data['public_token'])
    exchange_response = client.item_public_token_exchange(exchange_request)
    access_token = exchange_response['access_token']

    # create user Institution for this item
    inst = Institution(
        user=request.user,
        name=request.data['institution']['name'],
        plaid_institution_id=request.data['institution']['institution_id'],
        plaid_access_token=access_token,
    )
    inst.save()

    # create user Accounts for this item
    for acct_data in request.data['accounts']:
        account = Account(
            user=request.user,
            institution=inst,
            name=acct_data['name'],
            account_type=acct_data['type'],
            account_subtype=acct_data['subtype'],
            plaid_account_id=acct_data['id'],
        )
        account.save()

    serializer = InstitutionSerializer(inst)
    return Response(serializer.data)


# retrieve Plaid accounts data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def accounts(request) -> Response:
    client = get_plaid_client()
    instId = request.GET.get('institution_id')
    institution = Institution.objects.get(user_id=request.user.id, id=instId)
    plaidRequest = AccountsGetRequest(access_token=institution.plaid_access_token)
    plaidResponse = client.accounts_get(plaidRequest)
    serializer = PlaidAccountSerializer(plaidResponse['accounts'], many=True)
    return Response(serializer.data)
