from django.conf import settings

import graphene
from graphene_django.debug import DjangoDebug


class DjangoDebugQuery:
    if settings.DEBUG:
        debug = graphene.Field(DjangoDebug, name="_debug")
