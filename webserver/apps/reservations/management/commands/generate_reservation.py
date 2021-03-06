from datetime import datetime, timezone

from django.core.management.base import BaseCommand
from apps.reservations.models import Reservation, ReservedBooth
from apps.booths.models import Booth
from apps.markets.models import Market
from apps.products.models import Product
from apps.commons.choices import ReservationStatus
from apps.users.models import User
from apps.commons.mock_data import SHOPNAME

import random


class Command(BaseCommand):
    help = 'Create Reservation'

    def _create_product(self, user):
        product_name = str(user) + ' Product'
        des = 'This is the best product of ' + str(user) + '. It costs 100 baht'
        p = Product.objects.create(
            name=product_name,
            user=user,
            description=des,
            image='/product.jpg'
        )
        return p

    def _get_market(self):
        return [
            Market.objects.get(pk=31),
            Market.objects.get(pk=30),
            Market.objects.get(pk=29),
            Market.objects.get(pk=11),
            Market.objects.get(pk=16),
            Market.objects.get(pk=15)\
        ]

    def _create_reservation(self):
        users = User.objects.all()
        markets = self._get_market()
        for i, user in enumerate(users):
            print(i)
            product = self._create_product(user)
            if str(user) == 'whalemart@mail.com':
                continue
            for market in markets:
                reservation = Reservation.objects.create(
                    shop_name=SHOPNAME[i],
                    reservation_time=datetime.now(timezone.utc),
                    user=user,
                    market=market,
                )

                reservation.products.add(product)

                for j in range(10):
                    booths = Booth.objects.filter(market=market)
                    ran = random.randint(0, len(booths)-1)
                    reserved_booth = ReservedBooth.objects.create(
                        reservation=reservation,
                        booth=booths[ran],
                    )


    def _approve(self):
        users = User.objects.all()
        approved_list = list()
        for n, user in enumerate(users):
            print(n)
            if user.pk < 15:
                continue
            reservations = Reservation.objects.filter(user=user)
            for reservation in reservations:
                reserved_booths = ReservedBooth.objects.filter(reservation=reservation)
                for i in range(10):
                    if reserved_booths[i].booth in approved_list:
                        continue
                    reservation.approved_booth = reserved_booths[i].booth
                    reservation.status = ReservationStatus.APPROVED
                    approved_list.append(reserved_booths[i].booth)
                    reservation.save()

    def _mock_for_approval(self):
        users = User.objects.all()
        market = Market.objects.get(pk=33)
        for i, user in enumerate(users):
            if i < 20:
                continue
            if i > 30:
                break
            product = self._create_product(user)
            reservation = Reservation.objects.create(
                shop_name=SHOPNAME[i],
                reservation_time=datetime.now(timezone.utc),
                user=user,
                market=market,
            )

            reservation.products.add(product)

            for j in range(10):
                booths = Booth.objects.filter(market=market)
                ReservedBooth.objects.create(
                    reservation=reservation,
                    booth=booths[j],
                )


    def handle(self, *args, **options):
        random.seed(1959)
        # self._create_reservation()
        # self._approve()
        self._mock_for_approval()
