from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from apps.commons.choices import ReservationStatus
from apps.booths.models import Booth
from apps.reservations.models import Reservation
from apps.payments.models import Installment
from apps.reservations.serializers import ReservationSerializer


class ReservationViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """
    ### Urls
    `/reserve-booth/`: api for vendor to reserve booths in a market\n
    `/approve-reservation/`: api for lessor to approve reservations\n
    `/reservation-status/`: api for vendor to view his/her reserved markets' status\n
    {\n
        "shop_name": "Couppee",
        "market": 1,
        "reserved_booths": [
            {"booth": 2},
            ...
            {...}
        ]
    }
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(user=user)


@api_view(['POST',])
def approve_booths(request, *args, **kwargs):
    """
    {\n
        "market": 1,
        "booths": [
            {
                "user": 1,
                "id": 1
            },
            ...,
            {...}
        ]
    }
    """
    market = request.data.get('market', None)
    booths = request.data.get('booths', [])
    approved_users = []

    # Approve reservations of all users in list sent by frontend
    for booth in booths:
        user = booth.get('user')
        approved_users.append(user)
        booth_id = booth.get('id')
        approved_reservation = Reservation.objects.filter(user=user, market=market)
        if len(approved_reservation) == 0:
            return Response("This user didn't reserve any booth in this market.", status=status.HTTP_400_BAD_REQUEST)
        approved_reservation = approved_reservation[0]
        booth_obj = Booth.objects.get(pk=booth_id)
        approved_reservation.approved_booth = booth_obj
        approved_reservation.status = ReservationStatus.APPROVED
        approved_reservation.save()
        reserved_booths = approved_reservation.reserved_booths.all()
        for reserved_booth in reserved_booths:
            if reserved_booth.booth == booth_obj:
                reserved_booth.status = ReservationStatus.APPROVED
            else:
                reserved_booth.status = ReservationStatus.REJECTED
            reserved_booth.save()

    # Reject reservations of all users who are not in list sent by frontend
    rejected_reservations = Reservation.objects.filter(market=market).exclude(user__id__in=approved_users)
    for rejected_reservation in rejected_reservations:
        rejected_reservation.status = ReservationStatus.APPROVED
        rejected_reservation.save()
        reserved_booths = rejected_reservation.reserved_booths.all()
        for reserved_booth in reserved_booths:
            reserved_booth.status = ReservationStatus.REJECTED
            reserved_booth.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', ])
def get_reserved_markets(request, *args, **kwargs):
    """
    ### Provide the reservation status of each market of the logged in user\n
    `reservation_status`:\n
    0: waiting for approval\n
    1: approved\n
    2: rejected\n
    3: cancelled\n
    `approved_booth`:\n
    id: approved booth id\n
    null: status is waiting for approval, rejected, or cancelled)\n
    `payment_status`:\n
    0: draft\n
    1: deposited\n
    2: fully paid\n
    null: haven't make any payment yet\n
    `incomplete_installment_id`:\n
    id: id of installment to upload receipt\n
    null: all of installments is complete\n
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
        if reservation.rental_payment_info.installments.filter(payment_method=Installment.BANK_TRANSFER,
                                                               receipt_image=None).exists():
            incomplete_installment = reservation.rental_payment_info.installments.filter(
                payment_method=Installment.BANK_TRANSFER, receipt_image=None)[0]
            market['incomplete_installment_id'] = incomplete_installment.id
        else:
            market['incomplete_installment_id'] = None
        markets.append(market)
    return Response(markets, status=status.HTTP_200_OK)