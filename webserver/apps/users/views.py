from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from apps.users.serializers import UserSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
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


@api_view()
def login_username(request, *args, **kwargs):
    username = request.query_params.get('username', None)
    password = request.query_params.get('password', None)
    try:
        user = User.objects.get(username=username)
        if check_password(password, user.password):
            request.user = user
            return Response({'is_success': True})
        return Response({'is_success': False})
    except User.DoesNotExist:
        return Response({'is_success': False})


@api_view()
def login_facebook(request, *args, **kwargs):
    facebook_token = request.query_params.get('facebook_token', None)
    try:
        user = User.objects.get(facebook_token=facebook_token)
        request.user = user
        return Response({'is_success': True})
    except User.DoesNotExist:
        return Response({'is_success': False})
