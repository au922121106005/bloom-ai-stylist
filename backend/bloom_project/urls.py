"""
URL configuration for bloom_project project.
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static
def root_view(request):
    return JsonResponse({
        'message': 'Welcome to Bloom API',
        'endpoints': {
            'admin': '/admin/',
            'products': '/api/products/',
            'users': '/api/users/',
            'orders': '/api/orders/',
            'chat': '/api/chat/',
            'voice_order': '/api/order/voice/'
        }
    })

urlpatterns = [
    path('', root_view),
    path('admin/', admin.site.urls),
    path('api/', include('apps.products.urls')),
    path('api/', include('apps.users.urls')),
    path('api/', include('apps.orders.urls')),
    path('api/feedback/', include('apps.feedback.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
