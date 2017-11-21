from django.core.management import BaseCommand

from apps.markets.models import Market
from apps.markets.models import Scene


class Command(BaseCommand):
    help = 'Create Scene Images'

    def handle(self, *args, **options):
        markets = Market.objects.all()
        for market in markets:
            image = market.cover_photo.image
            print(image)