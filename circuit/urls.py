from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CircuitViewSet, ReviewViewSet, RecommendationViewSet

router = DefaultRouter()
router.register(r'circuits', CircuitViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'recommendations', RecommendationViewSet, basename='recommendations')  # Important: Register the Recommendations

urlpatterns = [
    path('', include(router.urls)),  # Include the routes from the router
]
