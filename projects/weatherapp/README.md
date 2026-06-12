# WeatherApp - Real-time Weather Application

A full-stack weather application built with Django (backend) and HTML/CSS/JavaScript (frontend).

## Features

- 🌡️ Real-time weather data
- 📊 Detailed weather metrics (humidity, pressure, wind speed)
- 📅 4-day weather forecast
- 📍 Save favorite locations
- 📱 Responsive design

## Tech Stack

- **Backend**: Django 4.2, Django REST Framework
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite3
- **API**: OpenWeatherMap (integration ready)

## Setup Instructions

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Visit `http://127.0.0.1:8000`

## API Endpoints

- `GET /api/weather/locations/` - List saved locations
- `POST /api/weather/locations/add_location/` - Save new location
- `GET /api/weather/locations/weather/?city=London` - Get weather data

## Configuration

To use real weather data:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/)
2. Get your API key
3. Add `WEATHER_API_KEY` to `settings.py`

## Author

Jamiu - Full Stack Developer
