from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import ProductSerializer, ProductSerializerWithoutUser
from .models import Product

User = get_user_model()


class ProduceViewSet(viewsets.ViewSet):
    """
    Display product information.
    """
    serializer_class=ProductSerializerWithoutUser

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        user = get_object_or_404(User, id=request.user.id)
        products = Product.objects.filter(user=user).order_by('id')
        return Response(ProductSerializerWithoutUser(products, many=True).data)

    def retrieve(self, request, pk=None):
        print(pk)
        user = get_object_or_404(User, id=request.user.id)
        product = get_object_or_404(Product.objects.filter(user=user, id=pk))
        return Response(ProductSerializerWithoutUser(product).data)

    def destroy(self, request, pk=None):
        user = get_object_or_404(User, id=request.user.id)
        product = get_object_or_404(Product, user=user, id=pk)
        product.delete()
        return Response(status=status.HTTP_200_OK)