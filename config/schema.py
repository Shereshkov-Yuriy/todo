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
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))
    todo_by_project_id = graphene.List(TodoType, id=graphene.Int(required=False))
    users_by_project = graphene.List(UserType, title=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_todo_by_id(root, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    def resolve_todo_by_project_id(root, info, id=None):
        if id:
            return Todo.objects.filter(project__id=id)
        return None

    def resolve_users_by_project(root, info, title=None):
        if id:
            return User.objects.filter(project__title=title)
        return None


schema = graphene.Schema(query=Query)
