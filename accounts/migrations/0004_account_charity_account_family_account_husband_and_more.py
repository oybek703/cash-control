# Generated by Django 4.0.1 on 2022-01-25 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_account_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='charity',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='account',
            name='family',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='account',
            name='husband',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='account',
            name='is_married',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='parents',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='account',
            name='wife',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=15),
        ),
    ]