from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account


class AccountAdmin(UserAdmin):
    list_display = ('username', 'full_name', 'fund',
                    'last_login', 'date_joined')
    list_display_links = ('username',)
    readonly_fields = ('date_joined', 'last_login')
    ordering = ('-date_joined',)

    # As we using custom user model we need to add these
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AccountAdmin)
