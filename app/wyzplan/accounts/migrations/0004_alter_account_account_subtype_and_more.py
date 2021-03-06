# Generated by Django 4.0.1 on 2022-01-19 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_account_created_at_account_updated_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_subtype',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='account_subtype'),
        ),
        migrations.AlterField(
            model_name='account',
            name='plaid_account_id',
            field=models.CharField(blank=True, default='', max_length=255, verbose_name='plaid_account_id'),
        ),
    ]
