from django.contrib import admin
from .models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('city', 'country', 'latitude', 'longitude', 'created_at')
    search_fields = ('city', 'country')
    readonly_fields = ('created_at',)
