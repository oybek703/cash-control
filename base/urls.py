from django.urls.conf import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.MyTokenObtainPairView.as_view(), name='login')
]
