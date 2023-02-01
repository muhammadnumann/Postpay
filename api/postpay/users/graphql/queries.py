import graphene
from graphql_extensions.decorators import login_required

from . import nodes


class Query:
    viewer = graphene.Field(nodes.User)

    @login_required
    def resolve_viewer(self, info, **kwargs):
        return info.context.user
