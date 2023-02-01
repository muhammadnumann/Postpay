from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from sorl.thumbnail.admin import AdminImageMixin

from customers.settings import customer_settings

from . import models


@admin.register(models.User)
class UserAdmin(AdminImageMixin, BaseUserAdmin, admin.ModelAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
        "last_login",
        "created",
    )
    list_filter = ("is_staff", "created")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "password",
                    "email",
                    "first_name",
                    "last_name",
                    "language",
                    "timezone",
                    "avatar",
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": ("is_superuser", "is_staff", "groups"),
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide"),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    ordering = ("-id",)
    search_fields = ("=email",)
    show_full_result_count = False

    def get_queryset(self, request):
        return (
            super()
            .get_queryset(request)
            .exclude(
                email__regex=(
                    rf"^[a-z0-9]{{32}}@{customer_settings.DEFAULT_DOMAIN_EMAIL}$",
                )
            )
        )
