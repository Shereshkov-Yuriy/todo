from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from .views import ProjectModelViewSet, TodoModelViewSet

# APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
# from django.contrib.auth import get_user_model

# from .models import Project, Todo


class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.url = "/api/project/"
        self.data = {
            "title": "Point",
            "link_repo": "http://point.repo",
            "users": 3,
        }
        # User = get_user_model()
        # self.admin = User.objects.create_superuser("admin8", "admin@adm.ru", "Admin_8888")
        return super().setUp()

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format="json")
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_create_admin(self):
    #     factory = APIRequestFactory()
    #     request = factory.post(self.url, self.data, format="json")
    #     force_authenticate(request, self.admin)
    #     view = ProjectModelViewSet.as_view({"post": "create"})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestTodoViewSet(TestCase):
    def setUp(self) -> None:
        self.url = "/api/todo/"
        return super().setUp()

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = TodoModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
