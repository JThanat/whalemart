from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib import auth
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .serializers import RegistrationSerializer, UserSerializer, get_facebook_id

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    credit_cards data example:\n
    "credit_cards": [\n
        {\n
            "id": 10,\n
            "card_number": "1",\n
            "card_holder_name": "2",\n
            "type": 1,\n
            "expiry_date": "2017-05-16",\n
            "verification_no": "1"\n
        }\n
    ]\n
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


@api_view(['GET',])
def get_current_user(request, *args, **kwargs):
    if request.user.is_anonymous():
        return Response('Please login', status=status.HTTP_400_BAD_REQUEST)
    user = request.user
    return Response({'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email},
                    status=status.HTTP_200_OK)
