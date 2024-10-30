# checkin/urls.py
from django.urls import path
from .views import check_in  # Import the function-based view

urlpatterns = [
    path('', check_in, name='checkin'),  # Use the function as the view
]
