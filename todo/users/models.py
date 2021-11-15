from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)
    #firstname = models.CharField(max_length=50)
    #lastname = models.CharField(max_length=50)


