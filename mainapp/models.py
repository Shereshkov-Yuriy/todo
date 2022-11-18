from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _


class Project(models.Model):
    title = models.CharField(max_length=256, verbose_name=_("Name"))
    link_repo = models.URLField(unique=True, verbose_name=_("Repository"))
    users = models.ManyToManyField(get_user_model(), verbose_name=_("Users"))
    
    def __str__(self) -> str:
        return f"{self.title} {list(self.users.values_list('username', flat=True))}"
    
    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name=_("Project"))
    todo = models.TextField(default=_("No TODO"), verbose_name=_("TODO"))
    created = models.DateTimeField(auto_now_add=True, verbose_name="Created")
    updated = models.DateTimeField(auto_now=True, verbose_name="Edited")
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name=_("User"))
    is_closed = models.BooleanField(default=False, verbose_name=_("closed"))
    
    def __str__(self):
        return f"{self.project} ({self.user})"
    
    def delete(self, *args):
        self.is_closed = True
        self.save()
        
    class Meta:
        verbose_name = _("TODO")
        verbose_name_plural = _("TODO")
        