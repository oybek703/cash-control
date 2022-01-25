from django.db.models.signals import pre_save
from .models import Fund, Expense


def update_expense(sender, instance, **kwargs):
    expense = instance
    user_fund = Fund.objects.get(expense.user)
    user_fund.amount -= expense.amount
    user_fund.save()


pre_save.connect(update_expense, sender=Expense)
