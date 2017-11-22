from rest_framework import viewsets, mixins
from apps.reservations.models import Reservation
from apps.reservations.serializers import ReservationSerializer


class ReservationViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(user=user)
