from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account


class AccountAdmin(UserAdmin):
    list_display = ('full_name', 'fund', 'charity', 'parents', 'myself', 'spouse',
                    'family', 'total_budget', 'last_login')
    list_display_links = ('full_name',)
    readonly_fields = ('last_login',)

    # As we using custom user model we need to add these
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AccountAdmin)
