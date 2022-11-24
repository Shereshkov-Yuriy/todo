from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserCustomViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet
):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
