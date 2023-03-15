from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserServiceModelSerializer


class CustomUserCustomViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet
):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == "service":
            return CustomUserServiceModelSerializer
        return CustomUserModelSerializer
