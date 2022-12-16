from django.core.management.base import BaseCommand
from mixer.backend.django import mixer

from mainapp.models import Project, Todo


class Command(BaseCommand):
    help = "Create projects and todos"

    def handle(self, *args, **options):
        for _ in range(5):
            mixer.blend(Project)
            mixer.blend(Todo)
        print("Done")
