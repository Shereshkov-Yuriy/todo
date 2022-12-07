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


class TodoUpdateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(self, root, info, text, id):
        todo = Todo.objects.get(id=id)
        todo.todo = text
        todo.save()
        return TodoUpdateMutation(todo=todo)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        link_repo = graphene.String(required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(self, root, info, title, link_repo):
        project = Project.objects.create(title=title, link_repo=link_repo)
        return ProjectCreateMutation(project=project)


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    project = graphene.List(ProjectType)

    @classmethod
    def mutate(self, root, info, id):
        try:
            Project.objects.get(id=id).delete()
            project = Project.objects.all()
            return ProjectDeleteMutation(project=project)
        except Project.DoesNotExist:
            project = Project.objects.all()
            return ProjectDeleteMutation(project=project)


class Mutation(ObjectType):
    update_todo = TodoUpdateMutation.Field()
    create_project = ProjectCreateMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
