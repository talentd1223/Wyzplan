# A migration to run first to ensure CITextExtension is installed without having to tie it
# into another migration which could get reversed which uninstalls the extension
from django.contrib.postgres.operations import CITextExtension
from django.db import migrations

class Migration(migrations.Migration):
    operations = [
        CITextExtension(),
    ]