"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from rest_framework.routers import DefaultRouter
from users.views import ProjectModelViewSet, ToDoModelViewSet, UsersCustomVewSet, ProjectParamFilterViewSet
                        # TokenTestModelViewSet
                       # TokenT# UserModelViewSet, UserViewSet  #
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
filter_router = DefaultRouter()
# filter_router.register('param', ProjectParamFilterViewSet)

router.register('users', UsersCustomVewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', ToDoModelViewSet)
# router.register('tokentest', TokenTestModelViewSet)

schema_view = get_schema_view(
    openapi.Info( 'Todo list',
    default_version='v1',
    description='Todo project documentation',
    contact = openapi.Contact(email="test@test.ru"),
    license = openapi.License(name='test license')
    ),
    public=True,
    permission_classes=(AllowAny,)
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth', obtain_auth_token),
    path('api/token/get', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc')),
    path('swagger/<str:format>/', schema_view.without_ui())
 #   path('project/filter/', include(filter_router.urls))
]