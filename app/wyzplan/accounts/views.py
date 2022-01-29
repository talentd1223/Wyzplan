from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView

from wyzplan.accounts.models import Account, Institution
from wyzplan.accounts.serializers import AccountSerializer, InstitutionSerializer


class AccountView(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # could also override filter_queryset to do this
        # and should if we implement more complex filtering and use django-filter
        return qs.filter(user=self.request.user)


class InstitutionListView(ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # could also override filter_queryset to do this
        # and should if we implement more complex filtering and use django-filter
        return qs.filter(user=self.request.user)
