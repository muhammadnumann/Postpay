import copy

from django.apps import apps
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from django.urls import NoReverseMatch, reverse


class Item:
    def __init__(self, label, url=None, target_blank=False, perms=None):
        self.label = label
        self.url = url
        self.target_blank = target_blank
        self.perms = perms

    def has_perms(self, request):
        if not self.perms:
            return True

        if isinstance(self.perms, str):
            perms = (self.perms,)
        else:
            perms = self.perms

        return request.user.has_perms(perms)

    def url_handler(self, context):
        if callable(self.url):
            self.url = self.url(context)
        else:
            try:
                URLValidator()(self.url)
            except ValidationError:
                try:
                    self.url = reverse(
                        self.url,
                        current_app=context.request.current_app,
                    )
                except NoReverseMatch:
                    pass


class Row(Item):
    def __init__(self, label=None, model=None, section=None, **kwargs):
        super().__init__(label, **kwargs)
        self.model = model
        self.section = section

    def is_valid(self, request, model):
        if not self.url and model is None:
            return False
        return self.has_perms(request)

    @property
    def model_key(self):
        if self.section is not None and self.model and "." not in self.model:
            return f"{self.section.app}.{self.model}"
        return self.model

    def prepare_from_model(self, context, model):
        if not self.label and model is not None:
            self.label = model["name"]

        if not self.url and model is not None:
            self.url = model["admin_url"]
        else:
            self.url_handler(context)


class Section(Item):
    def __init__(self, label=None, app=None, rows=None, icon=None, **kwargs):
        super().__init__(label, **kwargs)
        self.user_rows = rows
        self.app = app
        self.rows = []
        self.icon = icon

    def is_valid(self, request):
        if not self.url and not self.rows:
            return False
        return self.has_perms(request)

    def prepare_from_app(self, context, app):
        if not self.label and app is not None:
            self.label = app["name"]

        if not self.url:
            if self.rows:
                self.url = self.rows[0].url
            elif app is not None:
                self.url = app["app_url"]
        else:
            self.url_handler(context)

    def register_rows(self, app):
        for model in app["models"]:
            self.rows.append(
                Row(
                    model["name"],
                    model=model.get("key"),
                    url=model["admin_url"],
                    section=self,
                ),
            )


class MenuManager:
    def __init__(self, context):
        self.context = context
        self.config = apps.get_app_config("sidebar")
        self.sections = None
        self.apps = {}
        self.models = {}

    def __iter__(self):
        if self.sections is None:
            self.sections = self.generate_menu()

        for section in self.sections:
            yield section

    def _prepare_apps(self):
        for app in self.context.get("available_apps"):
            app_label = app["app_label"]
            self.apps[app_label] = app

            for model in app["models"]:
                model_key = f"{app_label}.{model['object_name'].lower()}"
                model["key"] = model_key
                self.models[model_key] = model

    def generate_menu(self):
        self._prepare_apps()
        sections = []

        for section in copy.deepcopy(self.config.menu):
            app = self.apps.get(section.app)

            if section.user_rows is not None:
                for row in section.user_rows:
                    row.section = section
                    model = self.models.get(row.model_key)

                    if row.is_valid(self.context.request, model):
                        row.prepare_from_model(self.context, model)
                        section.rows.append(row)

            elif app is not None:
                section.register_rows(app)

            if section.is_valid(self.context.request):
                section.prepare_from_app(self.context, app)
                sections.append(section)

        return sections
