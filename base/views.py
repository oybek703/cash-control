from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import AccountSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Expense, Income
from accounts.models import Account
from .serializers import ExpenseSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = AccountSerializerWithToken(self.user)
        for k, v in serializer.data.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def update_user_budget(income_total, user):
    charity = float(2.5 * float(income_total) / 100)
    left_income = float(income_total) - charity
    parents = float(left_income * 10 / 100)
    spouse = float(left_income * 20 / 100)
    myself = float(left_income * 20 / 100)
    family = float(left_income * 30 / 100)
    if not user.is_married:
        family = 0
        spouse = 0
    fund = left_income - (parents + spouse + myself + family)
    user.charity = float(charity) + float(user.charity)
    user.parents = float(parents) + float(user.parents)
    user.spouse = float(spouse) + float(user.spouse)
    user.myself = float(myself) + float(user.myself)
    user.family = float(family) + float(user.family)
    user.fund = float(fund) + float(user.fund)
    return user


def check_income(amount, user, expense_type):
    if amount < float(getattr(user, expense_type)):
        setattr(user, expense_type, float(getattr(user, expense_type)) - amount)
    else:
        user.fund = float(user.fund) - amount
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
        amount = float(expense.amount)
        if expense.type == 'charity':
            user = check_income(amount, user, 'charity')
        elif expense.type == 'parents':
            user = check_income(amount, user, 'parents')
        elif expense.type == 'family':
            user = check_income(amount, user, 'family')
        elif expense.type == 'unexpected' or expense.type == 'debt' or expense.type == 'other':
            user = check_income(amount, user, 'fund')
        else:
            user = check_income(amount, user, 'myself')
        user.save()
        return Response({'detail': f'Expense {expense.id} added.'})
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_daily_expense(request):
    try:
        user = Account.objects.get(pk=request.user.id)
        expenses = Expense.objects.filter(
            user=user,
            payed_at__day=datetime.today().strftime('%d')
        )
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
