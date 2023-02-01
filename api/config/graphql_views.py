from graphql_extensions.views import GraphQLView as BaseGraphQLView


class GraphQLView(BaseGraphQLView):
    @staticmethod
    def format_error(error):
        formatted = BaseGraphQLView.format_error(error)
        formatted.pop("error_data", None)
        return formatted
