from rest_framework import viewsets

from apps.tags.models import Tag
from apps.tags.serializers import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by('tag')
    serializer_class = TagSerializer
