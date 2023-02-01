from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from model_utils.models import TimeStampedModel
from sorl.thumbnail import ImageField
from timezone_field import TimeZoneField

from utils.models import UUIDUploadTo

from . import fields, managers
from .settings import user_settings


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    email = fields.EmailField(_("email address"), db_index=True, unique=True)
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    is_active = models.BooleanField(_("is active"), default=True)
    is_staff = models.BooleanField(_("is staff"), default=False)
    language = models.CharField(
        _("language"),
        max_length=8,
        default=settings.LANGUAGE_CODE,
    )
    timezone = TimeZoneField(_("timezone"), blank=True)
    phone = models.CharField(_("phone"), max_length=64, blank=True)
    avatar = ImageField(
        upload_to=UUIDUploadTo(user_settings.AVATAR_UPLOAD_DIR),
        verbose_name=_("avatar"),
        null=True,
        blank=True,
    )

    objects = managers.UserManager()

    USERNAME_FIELD = "email"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name
