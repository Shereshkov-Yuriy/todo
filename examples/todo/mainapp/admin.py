from django.contrib import admin

from mainapp import models as mainapp_models


@admin.register(mainapp_models.Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(mainapp_models.Todo)
class TodoAdmin(admin.ModelAdmin):
    pass
