# Generated by Django 4.0.1 on 2022-01-25 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fund',
            name='amount',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
    ]