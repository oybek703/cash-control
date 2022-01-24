from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    fullname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'fullname']

    def get_fullname(self, obj):
        return f'{obj.first_name} {obj.last_name}'


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'token', 'fullname']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
