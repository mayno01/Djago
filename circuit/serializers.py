# circuit/serializers.py
from rest_framework import serializers
from .models import Circuit, Review

class CircuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circuit
        fields = '__all__'  # or specify the fields you want

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'  # or specify the fields you want
