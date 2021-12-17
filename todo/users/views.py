from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import mixins, status

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet, ViewSet
from .models import User, Project, ToDo
from .serializers import UserModelSerializer, ProjectModelSerializer, ToDoModelSerializer, UserModelSerializerLimited

from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, ToDoFilter

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import BasePermission, IsAuthenticated


class StaffOnly(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff

# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer


class UsersCustomVewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == "2.0":
            return UserModelSerializerLimited
        else:
            return UserModelSerializer
# class TokenTestModelSerializer(mixins.RetrieveModelMixin):
#     # queryset = get_object_or_404(Project, pk=1)
#     queryset = Project.objects.all()
#     serializer_class = TokenTestModelSerializer
#     permission_class = [IsAuthenticated]


class ProjectParamFilterViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    
    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        
        if name:
            projects = projects.filter(project_name__contains=name)
        return projects    


class ProjectsLimitOffsetPaginations(LimitOffsetPagination):
    default_limit = 3


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectsLimitOffsetPaginations
    filterset_fields = ['project_name']
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(project_name__contains=name)

        return projects


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):

    def get_serializer_class(self):

        if self.request.version == "0.5":
            return ToDoModelSerializerV05
        return ToDoModelSerializer

    queryset = ToDo.objects.all()
    # serializer_class =
    filterset_class = ToDoFilter
    # permission_classes = [IsAuthenticated]

    def destroy(self, request, pk=None):
        instance = get_object_or_404(ToDo, pk=pk)
        instance.is_deleted = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
