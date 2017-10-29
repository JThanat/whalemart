from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


class Ping(APIView):
    """
    A view that returns the count of active users in JSON.
    """
    renderer_classes = (JSONRenderer,)

    def get(self, request, format=None):
        content = {'pong': 'pong'}
        return Response(content)
