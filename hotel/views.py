from django.shortcuts import render, get_object_or_404, redirect
from .models import Hotel
from .forms import HotelForm
def hotel_list(request):
    hotels = Hotel.objects.all()  # Fetch all hotels from the database
    context = {
        'hotels': hotels,
    }
    return render(request, 'hotel/hotel_list.html', context)

def hotel_detail(request, pk):
    hotel = get_object_or_404(Hotel, pk=pk)  # Retrieve hotel by primary key
    return render(request, 'hotel/hotel_detail.html', {'hotel': hotel})

from django.http import JsonResponse
import json

def hotel_create(request):
    if request.method == 'POST':
        # If the request content type is JSON
        if request.content_type == 'application/json':
            data = json.loads(request.body)  # Load JSON data from the request body
            form = HotelForm(data)
            if form.is_valid():
                hotel = form.save()
                return JsonResponse({'id': hotel.id, 'message': 'Hotel created successfully!'}, status=201)
            else:
                return JsonResponse({'errors': form.errors}, status=400)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)

def hotel_update(request, pk):
    hotel = get_object_or_404(Hotel, pk=pk)
    if request.method == 'POST':
        # Check if the request content type is JSON
        if request.content_type == 'application/json':
            data = json.loads(request.body)  # Load JSON data from the request body
            form = HotelForm(data, instance=hotel)
            if form.is_valid():
                form.save()  # Save updated hotel
                return JsonResponse({'message': 'Hotel updated successfully!'}, status=200)
            else:
                return JsonResponse({'errors': form.errors}, status=400)
        else:
            # Handle traditional form data submission
            form = HotelForm(request.POST, instance=hotel)
            if form.is_valid():
                form.save()
                return redirect('hotel_list')  # Redirect to hotel list after updating
    else:
        # Render the form with current hotel data for GET request
        form = HotelForm(instance=hotel)
        return render(request, 'hotel/hotel_form.html', {'form': form, 'hotel': hotel})

def hotel_delete(request, pk):
    hotel = get_object_or_404(Hotel, pk=pk)
    if request.method == 'POST':
        hotel.delete()  # Delete the hotel
        return redirect('hotel_list')
    return render(request, 'hotel/hotel_confirm_delete.html', {'hotel': hotel})
