from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from mixer.backend.django import mixer

User = get_user_model()
User.objects.create_superuser(username="admin", email="admin@ru.ru", password="admin")


class Command(BaseCommand):
    help = "This command create superuser and users"

    def handle(self, *args, **options):

        for _ in range(5):
            mixer.blend(User)
        print("done")
