from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Expense
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
        return Response({'detail': f'{expense.id} expense added.'})
    except Exception as e:
        return Response({'detail': str(e)})
