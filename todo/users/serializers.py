from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from rest_framework.serializers import StringRelatedField
from .models import User, Project, ToDo

#
# class TokenTestModelSerializer(ModelSerializer):
#     class Meta:
#         model = Project
#         fields = ['id']


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'id']


class ProjectModelSerializer(ModelSerializer):

    # user = UserModelSerializer(many=True)
    # user = StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):

    # user = StringRelatedField()
    # project = ProjectModelSerializer()
    # project = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
