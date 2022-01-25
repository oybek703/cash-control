from django.contrib import admin
from .models import Expense, Income


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'payed_at', 'type')


admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Income)
