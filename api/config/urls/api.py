from django.conf import settings
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt

from graphql_jwt.decorators import jwt_cookie

from .. import graphql_views, schemas, views
from .debug import debug_toolbar_urlpatterns
from .static import static_urlpatterns

__all__ = ["urlpatterns"]


def graphql_path(route, schema, batch=False, **kwargs):
    if batch:
        graphiql = False
    else:
        graphiql = settings.DEBUG

    return path(
        f"graphql{route}",
        jwt_cookie(
            csrf_exempt(
                graphql_views.GraphQLView.as_view(
                    graphiql=graphiql,
                    schema=schema,
                    batch=batch,
                ),
            )
        ),
        **kwargs,
    )


urlpatterns = [
    # RESTful
    path("", include("checkouts.restful.urls")),
    path("", include("hooks.restful.urls")),
    path("", include("merchants.restful.urls")),
    path("", include("orders.restful.urls")),
    path("", include("payments.restful.urls")),
    path("", include("payment_methods.urls")),
    # GraphQL
    graphql_path("", schemas.merchants_schema, name="merchants"),
    graphql_path("/checkout", schemas.checkouts_schema, name="checkouts"),
    graphql_path("/customers", schemas.customers_schema, name="customers"),
    graphql_path("/one", schemas.one_schema, name="one"),
    # GraphQL batch
    graphql_path(
        "/batch",
        schemas.merchants_schema,
        batch=True,
        name="merchants-batch",
    ),
    graphql_path(
        "/customers/batch",
        schemas.customers_schema,
        batch=True,
        name="customers-batch",
    ),
    # Others
    path("gateways/", include("gateways.urls", namespace="gateways")),
    path(
        "payments/",
        include("instalment_plans.urls", namespace="instalment-plans"),
    ),
    path("", include("social_django.urls", namespace="social")),
    path("", include("bigcommerce_gateway.urls", namespace="bigcommerce-gateway")),
    path("", include("shopify_gateway.urls", namespace="shopify-gateway")),
] + debug_toolbar_urlpatterns

if settings.DEBUG:
    urlpatterns += static_urlpatterns

handler404 = views.handler404
