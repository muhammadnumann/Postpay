import logging

import sentry_sdk
from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration

from .base import *  # NOQA F403

# AWS STORAGE
INSTALLED_APPS = ["collectfast"] + INSTALLED_APPS + ["storages"]  # NOQA F405
COLLECTFAST_STRATEGY = "collectfast.strategies.boto3.Boto3Strategy"
AWS_STORAGE_BUCKET_NAME = env("DJANGO_AWS_STORAGE_BUCKET_NAME")  # NOQA F405
AWS_AUTO_CREATE_BUCKET = env.bool(  # NOQA F405
    "DJANGO_AWS_AUTO_CREATE_BUCKET",
    default=False,
)
AWS_QUERYSTRING_AUTH = env.bool(  # NOQA F405
    "DJANGO_AWS_QUERYSTRING_AUTH",
    default=False,
)
_AWS_EXPIRY = 60 * 60 * 1
AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": f"max-age={_AWS_EXPIRY}, s-maxage={_AWS_EXPIRY}, must-revalidate",
}
STATICFILES_STORAGE = "config.s3boto3.StaticRootS3Boto3Storage"
STATIC_URL = f"http://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/static/"
DEFAULT_FILE_STORAGE = "config.s3boto3.MediaRootS3Boto3Storage"
MEDIA_URL = f"http://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/"
AWS_S3_CUSTOM_DOMAIN = env(  # NOQA F405
    "DJANGO_AWS_S3_CUSTOM_DOMAIN",
    default=AWS_STORAGE_BUCKET_NAME,
)

# SECURITY
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool(  # NOQA F405
    "DJANGO_SECURE_SSL_REDIRECT",
    default=True,
)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 60
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool(  # NOQA F405
    "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS",
    default=True,
)
SECURE_HSTS_PRELOAD = env.bool(  # NOQA F405
    "DJANGO_SECURE_HSTS_PRELOAD",
    default=True,
)
SECURE_CONTENT_TYPE_NOSNIFF = env.bool(  # NOQA F405
    "DJANGO_SECURE_CONTENT_TYPE_NOSNIFF",
    default=True,
)

# LOGGING
LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s",
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "sentry_sdk": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "django.security.DisallowedHost": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
    },
}

# SENTRY
SENTRY_DSN = env("DJANGO_SENTRY_DSN", default=None)  # NOQA F405
SENTRY_LOG_LEVEL = env.int(  # NOQA F405
    "DJANGO_SENTRY_LOG_LEVEL",
    default=logging.INFO,
)

sentry_sdk.init(
    dsn=SENTRY_DSN,
    environment=DJANGO_ENV,  # NOQA F405
    integrations=[
        LoggingIntegration(level=SENTRY_LOG_LEVEL, event_level=None),
        DjangoIntegration(),
        AwsLambdaIntegration(),
    ],
)
