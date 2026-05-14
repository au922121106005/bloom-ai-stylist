from django.urls import path
from .views import register, login, user_profile, forgot_password, reset_password
from .views import voice_order, chat_view

urlpatterns = [
    path('users/register/', register, name='register'),
    path('users/login/', login, name='login'),
    path('users/profile/', user_profile, name='user-profile'),
    path('users/forgot-password/', forgot_password, name='forgot-password'),
    path('users/reset-password/', reset_password, name='reset-password'),
    path('chat/', chat_view, name='chat'),
    path('order/voice/', voice_order, name='voice-order'),
]

