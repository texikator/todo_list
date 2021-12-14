from django.test import TestCase

# Create your tests here.

import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, UsersCustomVewSet, ToDoModelViewSet
from  .models import User, Project, ToDo


class TestProjectModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestToDoModelViewSet(APITestCase):

    def setUp(self):
        self.admin_user = User.objects.create_superuser(username="t_admin", password="12345", email="test@test.ru")

    def test_get_detail_project(self):
        project = mixer.blend(Project)
        response = self.client.get(f'/api/projects/{project.id}/'
        self.assertEqual(response.status_code, status.HTTP_200_OK)



