from django.contrib.auth import views as auth_views
from django.urls import path

from wyzplan.users.views import current_user

app_name = 'users'

# This could just include django.contrib.auth.views
# Specifying this way lets us ignore the `/account/` those are automatically prefixed with and do that ourselves only
# if we want it, here or where we include this in our main urls.py. It also allows us to override the templates for these
# leaving the djangoadmin using its default templates.
urlpatterns = [
    path('current_user/', current_user, name='current_user'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), {'next_page': '/'}, name='logout'),
    path('password/reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password/reset/complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path(
        'password/reset/confirm/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm',
    ),
    path('password/change/', auth_views.PasswordChangeView.as_view(), name='change_password'),
]
