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

    def _get_market(self):
        return [
            Market.objects.get(pk=31),
            Market.objects.get(pk=30),
            Market.objects.get(pk=29),
            Market.objects.get(pk=11),
            Market.objects.get(pk=16),
            Market.objects.get(pk=15)
        ]

    def _create_reservation(self):
        users = User.objects.all()
        markets = self._get_market()
        for i, user in enumerate(users):
            if str(user) == 'whalemart@mail.com':
                continue
            for market in markets:
                reservation = Reservation.objects.create(
                    shop_name=SHOPNAME[i],
                    reservation_time=datetime.now(timezone.utc),
                    user=user,
                    market=market,
                )

                for j in range(10):
                    booths = Booth.objects.filter(market=market)
                    ran = random.randint(0, len(booths)-1)
                    reserved_booth = ReservedBooth.objects.create(
                        reservation=reservation,
                        booth=booths[ran],
                    )


    def _create_demo_for_payment(self):
        pass

    def handle(self, *args, **options):
        random.seed(1959)
        self._create_demo_for_payment()
        self._create_reservation()

