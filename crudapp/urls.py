from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('create', views.create, name='create'),
    path('event', views.index_client, name='index_client'),
    path('update_event/<str:pk>', views.update, name = 'update'),
    path('show/<str:pk>', views.show, name = 'show'),
    path('delete_items/<str:pk>', views.delete, name = 'delete'),
    path('translate/', views.translate_view, name='translate'),
    path('show/translate_desc/', views.translate_view, name='translate_desc'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)