from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from apps.users.models import User
from apps.commons.choices import ReservationStatus
from apps.markets.models import Market
from apps.booths.models import Booth
from apps.reservations.models import Reservation, ReservedBooth
from apps.payments.models import Installment
from apps.reservations.serializers import ReservationSerializer
from apps.markets.serializers import MarketFeedSerializer
from apps.products.serializers import ProductSerializer
from apps.commons.notification import notify_reservation_approved


class ReservationViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """
    ### Urls
    `/reserve-booth/`: api for vendor to reserve booths in a market\n
    `/approve-reservation/`: api for lessor to approve reservations\n
    `/reservation-status/`: api for vendor to view his/her reserved markets' status\n
    `/unapproved-markets/`: api for lessor to view all unapproved booths\n
    `/booths-in-unapproved-market/<pk>/`: api for lessor to view all vendors reserving each booth in the market\n
    {\n
        "shop_name": "Ngue",
        "market": 4,
        "reserved_booths": [
            {"booth": 296},
            {"booth": 297},
            {"booth": 298},
            {"booth": 299},
            ...
            {...}
        ],
        "products": [
            1, ...
        ]
    }
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(user=user)


@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def get_unapproved_markets(request, *args, **kwargs):
    """
    Return all approved markets created by the current user
    """
    user = request.user
    markets = Market.objects.filter(created_user=user, is_approved_all_reservations=False)
    markets_json = []
    for market in markets:
        markets_json.append(MarketFeedSerializer(market).data)
    return Response(markets_json, status=status.HTTP_200_OK)


@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def get_booths_in_unapproved_market(request, *args, **kwargs):
    """
    Return all booth in the unapproved market
    """
    market_id = kwargs.get('pk', None)
    if not market_id:
        return Response('Please provide market id', status=status.HTTP_400_BAD_REQUEST)
    if not Market.objects.filter(pk=market_id).exists():
        return Response('Invalid market id', status=status.HTTP_400_BAD_REQUEST)
    booths = Market.objects.get(pk=market_id).booths.all().order_by('pk')
    booths_json = []
    for booth in booths:
        booth_json = dict()
        booth_json['id'] = booth.pk
        booth_json['booth_number'] = booth.booth_number
        booth_json['vendors'] = get_vendors_reserving_booth(booth)
        booths_json.append(booth_json)
    return Response(booths_json, status=status.HTTP_200_OK)


def get_vendors_reserving_booth(booth):
    reserved_booths = ReservedBooth.objects.filter(booth=booth)
    result = []
    for reserved_booth in reserved_booths:
        vendor_json = dict()
        user = reserved_booth.reservation.user
        vendor_json['id'] = user.pk
        vendor_json['first_name'] = user.first_name
        vendor_json['last_name'] = user.last_name
        reservation = reserved_booth.reservation
        vendor_json['shop_name'] = reservation.shop_name
        vendor_json['products'] = get_products_of_reservation(reservation)
        result.append(vendor_json)
    return result


def get_products_of_reservation(reservation):
    result = []
    for product in reservation.products.all():
        product_json = dict()
        product_json['id'] = product.id
        product_json['name'] = product.name
        product_json['image'] = ProductSerializer(product).data['image']
        product_json['description'] = product.description
        result.append(product_json)
    return result


@api_view(['POST', ])
@permission_classes((IsAuthenticated, ))
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

        # Send email
        user_obj = User.objects.get(pk=user)
        market_obj = Market.objects.get(pk=market)
        notify_reservation_approved(user_obj.email, user_obj.first_name+' '+user_obj.last_name, booth_obj.booth_number,
                                    market_obj.name, 'localhost:4200', market_obj.deposit_payment_due)

    # Reject reservations of all users who are not in list sent by frontend
    rejected_reservations = Reservation.objects.filter(market=market).exclude(user__id__in=approved_users)
    for rejected_reservation in rejected_reservations:
        rejected_reservation.status = ReservationStatus.APPROVED
        rejected_reservation.save()
        reserved_booths = rejected_reservation.reserved_booths.all()
        for reserved_booth in reserved_booths:
            reserved_booth.status = ReservationStatus.REJECTED
            reserved_booth.save()

    # Update market approval status
    market_obj = Market.objects.get(pk=market)
    market_obj.is_approved_all_reservations = True
    market_obj.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
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
    null: status is waiting for approval, rejected, or cancelled\n
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
    reservations = user.reservations.all()
    markets = []
    for reservation in reservations:
        market = dict()
        market['market_id'] = reservation.market.id
        market['market_name'] = reservation.market.name
        market['reservation_status'] = reservation.status
        if market['reservation_status'] == ReservationStatus.APPROVED:
            market['approved_booth'] = reservation.approved_booth.id
            market['booth_rental_fee'] = reservation.approved_booth.rental_fee
        else:
            market['approved_booth'] = None
            market['booth_rental_fee'] = None
        try:
            rental_payment_info = reservation.rental_payment_info
            market['payment_status'] = reservation.rental_payment_info.status
            if rental_payment_info.installments.filter(payment_method=Installment.BANK_TRANSFER,
                                                       receipt_image='').exists():
                incomplete_installment = reservation.rental_payment_info.installments.filter(
                    payment_method=Installment.BANK_TRANSFER, receipt_image='')[0]
                market['incomplete_installment_id'] = incomplete_installment.id
            else:
                market['incomplete_installment_id'] = None
        except:
            market['payment_status'] = None
            market['incomplete_installment_id'] = None
        markets.append(market)
    return Response(markets, status=status.HTTP_200_OK)
