from rest_framework import viewsets
from apps.reservations.models import Reservation
from apps.reservations.serializer import ReservationSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(user=user)
