from django.urls.conf import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add_expense', views.add_expense, name='add_expense'),
    path('add_income', views.add_income, name='add_income'),
    path('get_expense', views.get_expense, name='get_expense'),
    path('get_budget', views.get_budget, name='get_budget'),
    path('login', views.MyTokenObtainPairView.as_view(), name='login')
]
