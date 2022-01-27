# Generated by Django 4.0.1 on 2022-01-27 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_rename_created_at_income_received_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='type',
            field=models.CharField(choices=[('Unexpected', 'Unexpected'), ('Breakfast', 'Breakfast'), ('Lunch', 'Lunch'), ('Supper', 'Supper'), ('Clothing', 'Clothing'), ('Clothing', 'Clothing'), ('Parents', 'Parents'), ('Debt', 'Debt'), ('Phone', 'Phone'), ('Charity', 'Charity'), ('Service fee', 'Service fee'), ('Other', 'Other')], max_length=64),
        ),
        migrations.AlterField(
            model_name='income',
            name='type',
            field=models.CharField(choices=[('Salary', 'Salary'), ('Unexpected', 'Unexpected'), ('Work', 'Work'), ('Small business', 'Small business'), ('Other', 'Other')], max_length=64),
        ),
    ]
