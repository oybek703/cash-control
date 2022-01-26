from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from accounts.models import Account


class AccountSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    fullname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account
        fields = ['username', 'fullname']

    def get_fullname(self, obj):
        return obj.full_name()


class AccountSerializerWithToken(AccountSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account
        fields = ['username', 'token', 'fullname']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
