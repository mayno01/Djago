from django.shortcuts import render, redirect
from django.shortcuts import render, get_object_or_404
from . import utlis

from .models import Event

from .forms import EventForm
# Create your views here.
def index(request):
    events = Event.objects.all()
    form = EventForm()
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    return render(request, 'index.html', {'events':events, 'form': form})

def index_client(request):
    events = Event.objects.all()
    form = EventForm()
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index_client')
    return render(request, 'index_client.html', {'events':events, 'form': form})

def create(request):
    events = Event.objects.all()
    form = EventForm()
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    return render(request, 'create.html', {'events':events, 'form': form})

def update(request, pk):
    event = Event.objects.get(id=pk)
    form = EventForm(instance=event)
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES ,instance=event)
        if form.is_valid():
            form.save()
            return redirect('index')
    return render(request, 'update.html', {'event': event, 'form': form})

def delete(request, pk):
    event = Event.objects.get(id=pk)
    if request.method == 'POST':
        event.delete()
        return redirect('index')
    return render(request, 'del.html', {'event':event})

def show(request, pk):
    event = get_object_or_404(Event, id=pk)
    translated_description = None

    # Check if the translate button was clicked
    if 'translate' in request.GET:
        # Call your translation function
        translated_description = utlis.translate_text_clarifai(event.description)

    return render(request, 'show.html', {
        'event': event,
        'translated_description': translated_description
    })

def translate_view(request):
    translated_text = ""
    if request.method == 'POST':
        text = request.POST.get('text')
        translated_text = utlis.translate_text_clarifai(text)
    return render(request, 'translate.html', {'translated_text': translated_text})