# forms.py
from django import forms
from .models import Hotel

class HotelForm(forms.ModelForm):
    class Meta:
        model = Hotel
        fields = ['name', 'location', 'rating', 'price', 'description']