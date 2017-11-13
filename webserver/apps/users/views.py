from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer, CreditCardSerializer
from .models import CreditCard

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    Example:
    {
        "id": 1,
        "email": "sirinthra.cc@gmail.com",
        "first_name": "Sirinthra",
        "last_name": "Chantharaj",
        "phone": "123456789",
        "facebook_token": "1",
        "credit_cards": [{"card_number": "1", "card_holder_name": "2", "type": 1, "expiry_date": "2017-05-16", "verification_no": "1"}]
    }
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ValidateUserEmailView(APIView):
    """
    API endpoint that allows email to be checked before created
    """

    def get(self, request, *args, **kwargs):
        username = request.query_params.get('email', None)
        
        if not username:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user = User.objects.filter(username=username)
        if not user:
            return Response({'is_ok': True})
        else:
            return Response({'is_ok': False})


class CreditCardViewSet(viewsets.ModelViewSet):
    """
    API endpoint of credit card
    """
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer