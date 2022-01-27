from django.db import models
from accounts.models import Account


class Expense(models.Model):
    expense_type_choices = [
        ('Unexpected', 'Unexpected'),
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Supper', 'Supper'),
        ('Clothing', 'Clothing'),
        ('Clothing', 'Clothing'),
        ('Parents', 'Parents'),
        ('Debt', 'Debt'),
        ('Phone', 'Phone'),
        ('Charity', 'Charity'),
        ('Service fee', 'Service fee'),
        ('Other', 'Other')
    ]
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=3)
    type = models.CharField(max_length=64, choices=expense_type_choices)
    payed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Income(models.Model):
    income_type_choices = [
        ('Salary', 'Salary'),
        ('Unexpected', 'Unexpected'),
        ('Work', 'Work'),
        ('Small business', 'Small business'),
        ('Other', 'Other')
    ]
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=3)
    type = models.CharField(max_length=64, choices=income_type_choices)
    received_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.full_name()

