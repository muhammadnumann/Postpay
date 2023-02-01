from django.contrib.auth.models import BaseUserManager
from django.db import models

__all__ = ["UserManager"]


class UserQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_active=True)


class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra):
        if not email:
            raise ValueError("The given email must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra):
        extra.setdefault("is_staff", False)
        extra.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra)

    def create_superuser(self, email, password, **extra):
        extra.setdefault("is_staff", True)
        extra.setdefault("is_superuser", True)
        return self._create_user(email, password, **extra)


UserManager = CustomUserManager.from_queryset(UserQuerySet)
