from django.urls import path

from wyzplan.plaid import views

urlpatterns = [
    path('get_link_token', views.get_link_token),
    path('link_item', views.link_item),
    path('accounts', views.accounts),
]
