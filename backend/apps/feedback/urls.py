from django.urls import path
from . import views

urlpatterns = [
    path('', views.feedback_list_create, name='feedback_list_create'),
    path('<int:feedback_id>/', views.feedback_detail, name='feedback_detail'),
    path('featured/', views.featured_feedbacks, name='featured_feedbacks'),
]
