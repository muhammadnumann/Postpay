import socket

from .base import *  # NOQA F403

# GRAPHENE
GRAPHENE["MIDDLEWARE"] += ["graphene_django.debug.DjangoDebugMiddleware"]  # NOQA F405

# DEBUG TOOLBAR
INSTALLED_APPS += ["debug_toolbar", "graphiql_debug_toolbar"]  # NOQA F405
MIDDLEWARE += ["graphiql_debug_toolbar.middleware.DebugToolbarMiddleware"]  # NOQA F405
ip = socket.gethostbyname(socket.gethostname())
INTERNAL_IPS = ["127.0.0.1", f"{ip[:-1]}1"]
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"].append(  # NOQA F405
    "rest_framework.renderers.BrowsableAPIRenderer"
)

# ANYMAIL
ANYMAIL["DEBUG_API_REQUESTS"] = True  # NOQA F405
