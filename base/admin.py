from django.contrib import admin
from .models import Expense, Income, Fund


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'payed_at', 'type')


class FundAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'entered_at', 'updated_at')


admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Income)
admin.site.register(Fund, FundAdmin)

