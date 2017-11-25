from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib import auth
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from apps.commons.choices import ReservationStatus
from .serializers import RegistrationSerializer, UserSerializer, get_facebook_id

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    credit_cards data example:\n
    "credit_cards": [\n
        {
            "id": 10,
            "card_number": "1",
            "card_holder_name": "2",
            "type": 1,
            "expiry_date": "2017-05-16",
            "verification_no": "1"
        }
    ]
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class RegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Authentication Urls
    `/login-facebook/`: login with facebook
    `/login-username/`: login with username and password
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'is_success': True}, status=status.HTTP_201_CREATED, headers=headers)


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


@api_view(['POST',])
def login_username(request, *args, **kwargs):
    """
    ### Required
    `username`, `password`
    """
    username = request.data.get('username', None)
    password = request.data.get('password', None)
    try:
        user = User.objects.get(username=username)
        if check_password(password, user.password):
            auth.login(request, user)
            return Response({'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email},
                            status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST',])
def login_facebook(request, *args, **kwargs):
    """
    ### Required
    `facebook_token`
    """
    facebook_token = request.data.get('facebook_token', '')
    is_success, response = get_facebook_id(facebook_token)
    if is_success:
        try:
            user = User.objects.get(facebook_id=response)
            auth.login(request, user)
            return Response({'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email},
                            status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(response, status=response.status_code)


@api_view(['POST',])
def logout(request, *args, **kwargs):
    auth.logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def get_current_user(request, *args, **kwargs):
    """
    ### Get / Update Current User
    {
        "first_name": "aaa",
        "last_name": "bbb",
        "phone": "0812345678"
    }
    """
    if request.user.is_anonymous():
        return Response('Please login', status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        user = request.user
        return Response(UserSerializer(user).data)
    else:
        user = request.user

        first_name = request.data.get('first_name', None)
        last_name = request.data.get('last_name', None)
        phone = request.data.get('phone', None)

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if phone:
            user.phone = phone

        if 'profile_image' in request.FILES:
            user.profile_image = request.FILES['profile_image']

        user.save()
        return Response(UserSerializer(user).data)


@api_view(['GET',])
def get_reserved_markets(request, *args, **kwargs):
    """
    `reservation_status`:\n
    0: waiting for approval\n
    1: approved\n
    2: rejected\n
    3: cancelled\n
    `approved_booth`: approved booth id or null(if status is waiting for approval, rejected, or cancelled)\n
    `payment_status`:\n
    0: draft\n
    1: deposited\n
    2: fully paid\n
    """
    user = request.user
    if user.is_anonymous():
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    reservations = user.reservations.all()
    markets = []
    for reservation in reservations:
        market = dict()
        market['market_id'] = reservation.market.id
        market['reservation_status'] = reservation.status
        if market['reservation_status'] == ReservationStatus.APPROVED:
            market['approved_booth'] = reservation.approved_booth.id
            market['booth_rental_fee'] = reservation.approved_booth.rental_fee
        else:
            market['approved_booth'] = None
            market['booth_rental_fee'] = None
        if reservation.rental_payment_info:
            market['payment_status'] = reservation.rental_payment_info.status
        else:
            market['payment_status'] = None
        markets.append(market)
    return Response(markets, status=status.HTTP_200_OK)
