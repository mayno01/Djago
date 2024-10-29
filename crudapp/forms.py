from django import forms
from django.forms import ModelForm
from .models import Event
from django.utils.timezone import datetime  # For setting default date in the form

class EventForm(forms.ModelForm):
    title = forms.CharField(max_length=100, widget=forms.TextInput(attrs={
        'class': 'form-control', 'placeholder': "Enter Event name"
    }))
    date = forms.DateField(widget=forms.DateInput(attrs={
        'class': 'form-control', 'type': 'date', 'default': datetime.today().date()
    }))
    description = forms.CharField(widget=forms.Textarea(attrs={
        'class': 'form-control', 'placeholder': "Enter a description for the event"
    }))
    fee = forms.DecimalField(widget=forms.NumberInput(attrs={
        'class': 'form-control', 'placeholder': "Enter the registration fee"
    }))
    image = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={        
        'class': 'form-control'
    }))  # New image field

    class Meta:
        model = Event
        fields = '__all__'  # Ensures all fields in the model are used in the form
