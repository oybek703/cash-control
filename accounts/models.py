from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, fund, password=None):
        if not email:
            raise ValueError('User must have an email address.')
        if not username:
            raise ValueError('User must have username.')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            fund=fund,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, username, fund, email, password):
        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            fund=fund,
            username=username,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    username = models.CharField(max_length=256, unique=True)
    email = models.EmailField(max_length=64, unique=True)
    phone_number = models.CharField(max_length=32, blank=True, null=True)
    fund = models.DecimalField(max_digits=15, decimal_places=3, default=0)  # if married 20% else 50% of income
    # comes here automatically
    charity = models.DecimalField(max_digits=15, decimal_places=3, default=0)  # 2.5% of income always first take
    # this percent from every income and then others are calculated from left
    parents = models.DecimalField(max_digits=15, decimal_places=3, default=0)  # 10% of income
    is_married = models.BooleanField(default=False)
    spouse = models.DecimalField(max_digits=15, decimal_places=3, default=0)  # 20% of income
    myself = models.DecimalField(max_digits=15, decimal_places=3, default=0)  # 20% of income
    family = models.DecimalField(max_digits=15, decimal_places=3, default=0)  # total: 50% of income
    # if married 30% for family and 20% for fund else 50% all for fund

    # required fields (mandatory when creating custom user model)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'fund']

    # Tells that we are using MyAccountManager for creating all users
    objects = MyAccountManager()

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def total_budget(self):
        return str(self.fund+self.charity+self.parents+self.spouse+self.myself+self.family)

    def __str__(self):
        return self.first_name

    # Mandatory methods when implemented custom model
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True
