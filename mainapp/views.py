from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, TodoFilter
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20
    
    
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    # filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    # pagination_class = TodoLimitOffsetPagination
    # filterset_class = TodoFilter
