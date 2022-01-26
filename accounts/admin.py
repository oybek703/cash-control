from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account
from base.models import Expense


class ExpenseInline(admin.TabularInline):
    model = Expense
    readonly_fields = ('type', 'amount', 'payed_at')
    can_delete = False
    extra = 0


class AccountAdmin(UserAdmin):
    list_display = ('full_name', 'fund', 'charity', 'parents', 'myself', 'spouse',
                    'family', 'total_budget', 'last_login')
    list_display_links = ('full_name',)
    fields = (
        ('first_name', 'last_name'),
        ('email', 'phone_number'),
        ('fund', 'charity'),
        ('parents',),
        ('is_married',),
        ('spouse', 'myself'),
        ('family',),
        ('is_admin', 'is_staff', 'is_active', 'is_superadmin',)
    )
    readonly_fields = ('last_login',)
    inlines = [ExpenseInline]

    # As we using custom user model we need to add these
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AccountAdmin)
