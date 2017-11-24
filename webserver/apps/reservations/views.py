from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from apps.booths.models import Booth
from apps.reservations.models import Reservation
from apps.reservations.models import ReservedBooth
from apps.reservations.serializers import ReservationSerializer


class ReservationViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(user=user)


@api_view(['POST',])
def approve_booths(request, *args, **kwargs):
    market = request.data.get('market', None)
    booths = request.data.get('booths', [])
    for booth in booths:
        user = booth.get('user')
        booth_id = booth.get('id')
        reservations = Reservation.objects.filter(user=user, market=market)
        if len(reservations) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        reservation = reservations[0]
        booth_obj = Booth.objects.get(pk=booth_id)
        reservation.approved_booth = booth_obj
        reservation.save()
        reserved_booths = reservation.reserved_booths.all()
        for reserved_booth in reserved_booths:
            if reserved_booth.booth == booth_obj:
                reserved_booth.status = ReservedBooth.APPROVED
            else:
                reserved_booth.status = ReservedBooth.REJECTED
            reserved_booth.save()
    return Response(status=status.HTTP_200_OK)
