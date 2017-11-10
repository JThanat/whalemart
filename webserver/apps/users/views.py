from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

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
        username = kwargs['username']
        user = User.objects.filter(username=username)
        if not user:
            return Response({'is_ok': True})
        else:
            return Response({'is_ok': False})
