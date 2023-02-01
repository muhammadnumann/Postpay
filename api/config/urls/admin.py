from django.conf import settings
from django.contrib import admin
from django.urls import path, reverse_lazy
from django.views.generic import RedirectView

from .debug import debug_toolbar_urlpatterns
from .static import static_urlpatterns

admin.site.site_header = settings.ADMIN_SITE_NAME

urlpatterns = debug_toolbar_urlpatterns + [
    path(
        "",
        RedirectView.as_view(
            url=reverse_lazy("admin:instalment_plans_instalmentplan_changelist"),
        ),
    ),
    path(
        "docs",
        RedirectView.as_view(
            url="https://docs.postpay.io",
        ),
        name="django-admindocs-docroot",
    ),
    path("", admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static_urlpatterns
