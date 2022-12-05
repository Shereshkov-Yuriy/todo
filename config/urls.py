"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter

from authapp.views import CustomUserCustomViewSet
from mainapp.views import ProjectModelViewSet, TodoModelViewSet

router = DefaultRouter()
router.register("users", CustomUserCustomViewSet)
router.register("projects", ProjectModelViewSet)
router.register("todo", TodoModelViewSet)


schema_view = get_schema_view(
    openapi.Info(
        title="TODO",
        default_version="",
        description="Documentation for out project",
        contact=openapi.Contact(email="admin@ru.ru"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", RedirectView.as_view(url="api/")),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path("api-token/", obtain_auth_token),
    path("swagger/<str:format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
