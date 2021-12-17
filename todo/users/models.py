from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)
    # firstname = models.CharField(max_length=50)
    # lastname = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.username} {self.first_name} {self.last_name} {self.email}'



class StatusDict(models.Model):
    status = models.CharField(max_length=15)


class Project(models.Model):
    project_name = models.CharField(max_length=64)
    project_description = models.TextField(blank=True)
    repository = models.CharField(max_length=256, blank=True)
    create_date = models.DateTimeField(auto_now=True)
    user = models.ManyToManyField(User, blank=True)
    is_done = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    status = models.ForeignKey(StatusDict, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f'{self.project_name}'


class ToDo(models.Model):
    todo_name = models.CharField(max_length=128)
    todo_description = models.TextField(blank=True)
    user = models.OneToOneField(User, models.PROTECT)
    is_done = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now=True)
    complete_date = models.DateTimeField(blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.todo_name}'






