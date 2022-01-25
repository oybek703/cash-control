from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Expense, Income
from accounts.models import Account


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user)
        for k, v in serializer.data.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def update_user_budget(income_total, user):
    charity = float(2.5 * income_total / 100)
    left_income = float(income_total) - charity
    parents = float(left_income * 10 / 100)
    husband_or_wife = float(left_income * 20 / 100)
    myself = float(left_income * 20 / 100)
    family = float(left_income * 30 / 100)
    if not user.is_married:
        family = 0
    fund = left_income - (parents+husband_or_wife+myself+family)
    user.charity = float(charity) + charity
    user.parents = float(parents) + parents
    user.husband_or_wife = float(husband_or_wife) + husband_or_wife
    user.myself = float(myself) + myself
    user.family = float(family) + family
    user.fund = float(fund) + fund
    return user


@api_view(['GET'])
def index(request):
    return Response({'message': 'API is working...'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_expense(request):
    try:
        user = Account.objects.get(pk=request.user.id)
        expense = Expense.objects.create(
            user=user,
            amount=request.data['amount'],
            type=request.data['type']
        )
        expense.save()
        user.fund = float(user.fund) - float(expense.amount)
        user.save()
        return Response({'detail': f'Expense {expense.id} added.'})
    except Exception as e:
        return Response({'detail': str(e)})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_income(request):
    try:
        user = Account.objects.get(pk=request.user.id)
        income = Income.objects.create(
            user=user,
            amount=request.data['amount'],
            type=request.data['type']
        )
        updated_user = update_user_budget(income.amount, user)
        updated_user.save()
        return Response({'detail': f'Income {income.id} added.'})
    except Exception as e:
        return Response({'detail': str(e)})
