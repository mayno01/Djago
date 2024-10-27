from django.urls import path
from . import views

urlpatterns = [
    path('get_response/', views.chatbot_response, name='chatbot_response'),
]
