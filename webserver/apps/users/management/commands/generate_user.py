from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

from apps.commons.mock_data import USERLIST
from apps.users.models import User


class Command(BaseCommand):
    help = 'Create User'

    def _create_user(self):
        for user in USERLIST:
            User.objects.create(
                username=user['email'],
                email=user['email'],
                first_name=user['name'],
                last_name=user['lastname'],
                phone=user['phone'],
                password=make_password(user['password'])
            )

    def handle(self, *args, **options):
        self._create_user()
