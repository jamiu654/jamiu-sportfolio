from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Location
from .serializers import LocationSerializer
import requests


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
    @action(detail=False, methods=['get'])
    def weather(self, request):
        """Get weather data from OpenWeatherMap API"""
        city = request.query_params.get('city', 'London')
        
        # Using mock data for demo (replace with real API key)
        mock_weather = {
            'city': city,
            'temp': 20,
            'feels_like': 18,
            'humidity': 65,
            'pressure': 1013,
            'description': 'Partly Cloudy',
            'wind_speed': 5,
            'forecast': [
                {'day': 'Mon', 'high': 22, 'low': 18, 'condition': 'Sunny'},
                {'day': 'Tue', 'high': 20, 'low': 16, 'condition': 'Cloudy'},
                {'day': 'Wed', 'high': 18, 'low': 14, 'condition': 'Rainy'},
                {'day': 'Thu', 'high': 19, 'low': 15, 'condition': 'Partly Cloudy'},
            ]
        }
        
        return Response(mock_weather)
    
    @action(detail=False, methods=['post'])
    def add_location(self, request):
        city = request.data.get('city')
        country = request.data.get('country', 'Unknown')
        
        location, created = Location.objects.get_or_create(
            city=city,
            defaults={'country': country, 'latitude': 0.0, 'longitude': 0.0}
        )
        
        serializer = self.get_serializer(location)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
