from django.contrib import admin

from authapp import models as authapp_models


@admin.register(authapp_models.CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    pass
