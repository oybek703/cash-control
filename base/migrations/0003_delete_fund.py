# Generated by Django 4.0.1 on 2022-01-25 06:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_fund_amount'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Fund',
        ),
    ]