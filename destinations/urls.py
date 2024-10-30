# destinations/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DestinationViewSet
from .views import generate_description

router = DefaultRouter()
router.register(r'destinations', DestinationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate-description/', generate_description, name='generate_description'),
]
