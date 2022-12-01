# from mixer.backend.django import mixer
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate

from .models import Project, Todo
from .views import ProjectModelViewSet


class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.username = "admin8"
        self.password = "Admin_8888"
        User = get_user_model()
        self.admin = User.objects.create_superuser(self.username, "admin@adm.ru", self.password)
        self.url = "/api/projects/"
        self.data = {"title": "Point", "link_repo": "http://point.repo"}
        self.data_put = {"title": "Point Update", "link_repo": "http://point_update.repo"}
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

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format="json")
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        project = Project.objects.create(**self.data)
        response = client.get(f"{self.url}{project.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        client = APIClient()
        project = Project.objects.create(**self.data)
        response = client.put(f"{self.url}{project.id}/", self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        client = APIClient()
        project = Project.objects.create(**self.data)
        client.login(username=self.username, password=self.password)
        response = client.put(f"{self.url}{project.id}/", self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_update = Project.objects.get(id=project.id)
        self.assertEqual(project_update.title, "Point Update")
        self.assertEqual(project_update.link_repo, "http://point_update.repo")
        client.logout()


class TestTodoViewSet(APITestCase):
    def setUp(self) -> None:
        self.username = "admin8"
        self.password = "Admin_8888"
        User = get_user_model()
        self.admin = User.objects.create_superuser(self.username, "admin@adm.ru", self.password)
        self.url = "/api/todo/"
        self.data = {"title": "Point", "link_repo": "http://point.repo"}
        self.data_put = {"title": "Point Update", "link_repo": "http://point_update.repo"}
        return super().setUp()

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(**self.data)
        todo = Todo.objects.create(todo="test_todo", user=self.admin, project=project)
        self.client.login(username=self.username, password=self.password)
        response = self.client.put(
            f"{self.url}{todo.id}/", {"todo": "test_update", "user": todo.user.id, "project": todo.project.id}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_update = Todo.objects.get(id=todo.id)
        self.assertEqual(todo_update.todo, "test_update")
        self.client.logout()
