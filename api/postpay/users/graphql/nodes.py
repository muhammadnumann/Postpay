from graphene import relay
from graphene_django.types import DjangoObjectType

from .. import models


class User(DjangoObjectType):
    class Meta:
        model = models.User
        interfaces = (relay.Node,)
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone",
            "last_login",
            "created",
            "modified",
        )
