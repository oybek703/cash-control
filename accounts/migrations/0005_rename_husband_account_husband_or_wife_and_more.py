# Generated by Django 4.0.1 on 2022-01-25 10:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_account_charity_account_family_account_husband_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='husband',
            new_name='husband_or_wife',
        ),
        migrations.RenameField(
            model_name='account',
            old_name='wife',
            new_name='myself',
        ),
    ]