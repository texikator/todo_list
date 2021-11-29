from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import User, Project, ToDo
from .serializers import UserModelSerializer, ProjectModelSerializer, ToDoModelSerializer
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from djangorestframework_camel_case.parser import CamelCaseJSONParser

from rest_framework.generics import CreateAPIView


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer]  # CamelCaseJSONParser


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
