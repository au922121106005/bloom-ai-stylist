from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Feedback
from .serializers import FeedbackSerializer


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def feedback_list_create(request):
    """Get all feedbacks or create a new feedback"""
    if request.method == 'GET':
        # Get featured feedbacks first, then all others
        featured = Feedback.objects.filter(is_featured=True)
        all_feedbacks = Feedback.objects.all()
        serializer = FeedbackSerializer(all_feedbacks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            # Associate with user if authenticated
            if request.user and request.user.is_authenticated:
                serializer.save(user=request.user)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def feedback_detail(request, feedback_id):
    """Get, update or delete a specific feedback"""
    try:
        feedback = Feedback.objects.get(id=feedback_id)
    except Feedback.DoesNotExist:
        return Response({'error': 'Feedback not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = FeedbackSerializer(feedback, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        feedback.delete()
        return Response({'message': 'Feedback deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def featured_feedbacks(request):
    """Get all featured feedbacks"""
    feedbacks = Feedback.objects.filter(is_featured=True)
    serializer = FeedbackSerializer(feedbacks, many=True)
    return Response(serializer.data)
