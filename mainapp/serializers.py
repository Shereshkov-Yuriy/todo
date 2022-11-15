from rest_framework.serializers import (
    ModelSerializer, 
    HyperlinkedModelSerializer, 
    StringRelatedField,
)

from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField(many=True)
    
    class Meta:
        model = Project
        fields = "__all__"


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
