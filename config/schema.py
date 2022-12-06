import graphene
from django.contrib.auth import get_user_model
from graphene import ObjectType
from graphene_django import DjangoObjectType

from mainapp.models import Project, Todo

User = get_user_model()


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(TodoType)
    all_users = graphene.List(UserType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()


schema = graphene.Schema(query=Query)
