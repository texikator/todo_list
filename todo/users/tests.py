from django.test import TestCase


# Create your tests here.

import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase,\
                CoreAPIClient
from mixer.backend.django import mixer
from requests.auth import HTTPBasicAuth
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, UsersCustomVewSet, ToDoModelViewSet
from .models import User, Project, ToDo


class TestProjectModelViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestToDoModelViewSet(APITestCase):

    def setUp(self):
        self.test_user = "test_admin"
        self.test_password = "12345"
        self.test_email = "test@test.ru"
        self.admin_user = User.objects.create_superuser(self.test_user, self.test_email, self.test_password)
        self.test_todo = {'todo_name': 'test_todo', 'todo_description': 'test description 1', 'is_done': True}
        self.url = '/api/todos/'

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        todo = mixer.blend(ToDo)
        client = APIClient()
        response = client.get(f'/api/projects/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        todo = mixer.blend(ToDo)
        client = APIClient()
        response = client.put(f'/api/todos/{todo.id}/', {'todo_name': '123'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        todo = mixer.blend(ToDo)
        client = APIClient()
        client.login(username=self.test_user, password=self.test_password)

        response = client.put(f'/api/todos/{todo.id}/', {'project': "1", "user": 2, 'todo_name': 'qqq', 'todo_description': 'wwwww'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(test_todo.todo_name, 'qqq')
        client.logout()

    def test_core(self):
        client = CoreAPIClient()
        client.session.auth = HTTPBasicAuth(self.test_user, self.test_password)
        ca = client.session.request('get', 'http://127.0.0.1:8000/api/users/')
        result = ca.json()
        username = result[0]['username']
        self.assertEqual(username, self.test_user)

