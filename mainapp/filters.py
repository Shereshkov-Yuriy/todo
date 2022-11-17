from django_filters import rest_framework as filters
from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')
    
    class Meta:
        model = Project
        fields = ['title']


class TodoFilter(filters.FilterSet):
    project__title = filters.CharFilter(lookup_expr='iexact')
    
    class Meta:
        model = Todo
        fields = ['project__title']
    