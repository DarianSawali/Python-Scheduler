from django.contrib import admin
from .models import Event

admin.site.register(Event)

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_time', 'end_time', 'location')
    search_fields = ('title', 'location')