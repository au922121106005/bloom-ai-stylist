from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    rating_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Feedback
        fields = [
            'id',
            'name',
            'email',
            'rating',
            'rating_display',
            'message',
            'is_featured',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'rating_display']
    
    def get_rating_display(self, obj):
        return dict(Feedback.RATING_CHOICES).get(obj.rating, '')
