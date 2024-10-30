# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('hotels/', views.hotel_list, name='hotel_list'),
    path('hotels/<int:pk>/', views.hotel_detail, name='hotel_detail'),
    path('hotels/new/', views.hotel_create, name='hotel_create'),
    path('hotels/<int:pk>/edit/', views.hotel_update, name='hotel_update'),
    path('hotels/<int:pk>/delete/', views.hotel_delete, name='hotel_delete'),
]
