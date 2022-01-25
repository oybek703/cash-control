from django.db import models
from accounts.models import Account


class Expense(models.Model):
    expense_type_choices = [
        ('unexpected', 'Unexpected'),
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('supper', 'Supper'),
        ('clothing', 'Clothing'),
        ('clothing', 'Clothing'),
        ('parents', 'Parents'),
        ('debt', 'Debt'),
        ('phone', 'Phone'),
        ('charity', 'Charity'),
    ]
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=3)
    type = models.CharField(max_length=64, choices=expense_type_choices)
    payed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


class Income(models.Model):
    income_type_choices = [
        ('salary', 'Salary'),
        ('unexpected', 'Unexpected'),
        ('work', 'Work'),
        ('small_business', 'Small business'),
        ('other', 'Other')
    ]
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=3)
    type = models.CharField(max_length=64, choices=income_type_choices)
    created_at = models.DateTimeField(auto_now=True)

