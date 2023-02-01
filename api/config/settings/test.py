import environ

from .base import *  # NOQA F403

env = environ.Env()

MEDIA_ROOT = ROOT_DIR("test-media")  # NOQA F405
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    },
}

NOTIFICATIONS = {
    "SEND_NOTIFICATIONS": env.bool("SEND_NOTIFICATIONS", default=False),
}

PAYMENTS = {
    "CREATE_TRANSACTIONS": env.bool("CREATE_TRANSACTIONS", default=False),
}

FRAUD_RULES = {
    "SYNC_GRAPH_DATASET": env.bool("SYNC_GRAPH_DATASET", default=True),
}
