from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer, PasswordResetSerializer
from .models import UserProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@csrf_exempt
@api_view(['POST'])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email'].strip().lower()
        try:
            user_obj = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response({'error': 'User not registered'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(
            username=user_obj.username,
            password=serializer.validated_data['password']
        )

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data,
                'token': token.key
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')
    if not email:
        return Response({'email': ['Email is required.']}, status=status.HTTP_400_BAD_REQUEST)
    # In a real app, send a reset link by email.
    return Response({'message': 'If the email exists, reset instructions have been sent.'})

@csrf_exempt
@api_view(['POST'])
def reset_password(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email'].strip().lower()
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response({'email': ['No user found with that email.']}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(serializer.validated_data['password'])
        user.save()
        return Response({'message': 'Password reset successful'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    if not request.user.is_authenticated:
     return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        profile = UserProfile.objects.get(user=request.user)
        from .serializers import UserProfileSerializer
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=404)



@api_view(['POST'])
def chat_view(request):
    message = request.data.get('message', '').lower()

    if not message:
        return Response({
            "reply": "Tell me your dream bouquet aesthetic 🌸"
        }, status=status.HTTP_400_BAD_REQUEST)

    # Bouquet AI Logic
    if "bridal" in message or "wedding" in message:
        reply = (
            "For a bridal bouquet, I recommend white roses, "
            "baby's breath, orchids, and blush peonies 💍🌸"
        )

    elif "birthday" in message:
        reply = (
            "For birthdays, vibrant tulips, sunflowers, and "
            "pink carnations create a joyful bouquet 🎉🌻"
        )

    elif "romantic" in message or "love" in message:
        reply = (
            "A romantic bouquet with deep red roses, lilies, "
            "and eucalyptus would be perfect ❤️🌹"
        )

    elif "minimal" in message or "aesthetic" in message:
        reply = (
            "A soft minimalist bouquet with white lilies, "
            "baby's breath, and pastel roses would match beautifully ✨"
        )

    elif "nature" in message or "earthy" in message:
        reply = (
            "🌿 For a nature-inspired bouquet, go with wildflowers, eucalyptus, ferns, and soft green-white tones for a fresh organic look."
        )

    

    elif "purple" in message:
        reply = (
            "Lavender roses, purple orchids, and lilacs "
            "would create a dreamy purple bouquet 💜"
        )

    elif "yellow" in message:
        reply = (
            "Sunflowers, yellow tulips, and daisies "
            "would create a bright cheerful bouquet 🌻"
        )

    elif "pink" in message:
        reply = (
            "Pink roses, carnations, and peonies "
            "would make a soft elegant bouquet 🌷"
        )

    else:
        reply = (
            "Tell me your occasion, favorite flowers, colors, "
            "or aesthetic and I'll suggest the perfect bouquet 🌸"
        )

    return Response({
        "reply": reply
    })



@api_view(['POST'])
def voice_order(request):
    text = request.data.get('text', '')

    if not text:
        return Response({
            "status": "error",
            "message": "No voice input received"
        }, status=status.HTTP_400_BAD_REQUEST)

    # Basic processing (you can enhance later)
    return Response({
        "status": "success",
        "message": f"Order received: {text} 🎉"
    })