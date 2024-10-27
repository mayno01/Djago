from django.urls import path
from .views import predict_hotel_view, recommend_hotels_view  # Ensure these views are imported

urlpatterns = [
    path('recommend-hotels/', recommend_hotels_view, name='recommend_hotels'),  # Correctly defined path
    path('predict-hotel/', predict_hotel_view, name='predict_hotel'),  # Ensure other paths are defined correctly
]
