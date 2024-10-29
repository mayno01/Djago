from django.contrib import admin

# Register your models here.
from .models import Destination

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'price', 'popular')
    list_filter = ('location', 'popular')
    search_fields = ('name', 'location')