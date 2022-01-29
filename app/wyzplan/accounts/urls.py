from django.urls import path

from wyzplan.accounts import views

app_name = 'accounts'
urlpatterns = [
    path('institutions/', views.InstitutionListView.as_view(), name='institutions_list'),
    path('<int:pk>/', views.AccountView.as_view(), name='account_detail'),
]
