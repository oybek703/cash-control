# Generated by Django 4.0.1 on 2022-01-25 10:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_expense_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='income',
            old_name='created_at',
            new_name='received_at',
        ),
    ]