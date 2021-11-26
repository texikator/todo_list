from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from rest_framework.serializers import StringRelatedField
from .models import User, Project, ToDo


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']


class ProjectModelSerializer(HyperlinkedModelSerializer):

    # user = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):

    user = StringRelatedField()
    # project = ProjectModelSerializer()
    project = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
