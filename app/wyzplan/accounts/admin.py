from django.contrib import admin

from wyzplan.accounts.models import Account, Institution


class AccountAdmin(admin.ModelAdmin):
    raw_id_fields = ['user', 'institution']
    search_fields = ['user__email', 'name', 'institution__name']
    list_display = ['user', 'name', 'institution', 'created_at', 'updated_at']
    # these filters will be potentially a bit ineffcient unless we add choice limits
    # and possibly add indexes on them
    filter_fields = ['account_type', 'account_subtype']


class InstitutionAdmin(admin.ModelAdmin):
    raw_id_fields = ['user']
    search_fields = ['user__email', 'name']
    list_display = ['user', 'name', 'created_at', 'updated_at']


admin.site.register(Account, AccountAdmin)
admin.site.register(Institution, InstitutionAdmin)
