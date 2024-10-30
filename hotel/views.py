from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Hotel
from .forms import HotelForm
import json
from django.views.decorators.csrf import csrf_exempt

# List all hotels
def hotel_list(request):
    hotels = Hotel.objects.all()
    hotels_data = [{'id': hotel.id, 'name': hotel.name, 'location': hotel.location, 'rating': str(hotel.rating), 'price': str(hotel.price), 'description': hotel.description} for hotel in hotels]
    return JsonResponse(hotels_data, safe=False, status=200)

# Retrieve hotel details
def hotel_detail(request, pk):
    hotel = get_object_or_404(Hotel, pk=pk)
    hotel_data = {'id': hotel.id, 'name': hotel.name, 'location': hotel.location, 'rating': str(hotel.rating), 'price': str(hotel.price), 'description': hotel.description}
    return JsonResponse(hotel_data, status=200)

# Create a new hotel
@csrf_exempt
def hotel_create(request):
    if request.method == 'POST' and request.content_type == 'application/json':
        data = json.loads(request.body)
        form = HotelForm(data)
        if form.is_valid():
            hotel = form.save()
            return JsonResponse({'id': hotel.id, 'message': 'Hotel created successfully!'}, status=201)
        return JsonResponse({'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Invalid method'}, status=405)

# Update an existing hotel
@csrf_exempt
def hotel_update(request, pk):
    hotel = get_object_or_404(Hotel, pk=pk)
    if request.method == 'PUT' and request.content_type == 'application/json':
        data = json.loads(request.body)
        form = HotelForm(data, instance=hotel)
        if form.is_valid():
            hotel = form.save()
            return JsonResponse({'message': 'Hotel updated successfully!'}, status=200)
        return JsonResponse({'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Invalid method'}, status=405)

# Delete a hotel
@csrf_exempt
def hotel_delete(request, pk):
    hotel = get_object_or_404(Hotel, pk=pk)
    if request.method == 'DELETE':
        hotel.delete()
        return JsonResponse({'message': 'Hotel deleted successfully!'}, status=204)
    return JsonResponse({'error': 'Invalid method'}, status=405)
