# Generated by Django 4.0.1 on 2022-01-27 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_expense_payed_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='payed_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='income',
            name='received_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
