from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'rating', 'is_featured', 'created_at')
    list_filter = ('rating', 'is_featured', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'name', 'email')
        }),
        ('Feedback Details', {
            'fields': ('rating', 'message', 'is_featured')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
