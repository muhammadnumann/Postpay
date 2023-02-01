"""
Django settings for PostPay Technology Limited.

For more information on this file, see
https://docs.djangoproject.com/en/dev/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/dev/ref/settings/
"""

import sys
from datetime import timedelta

from django.conf.locale.en import formats as en_formats

import environ
from corsheaders.defaults import default_headers

env = environ.Env()

SITE_NAME = "postpay"
DJANGO_ENV = env("DJANGO_ENV", default=None)

ROOT_DIR = environ.Path(__file__) - 3
APPS_DIR = ROOT_DIR.path(SITE_NAME)

sys.path.append(str(APPS_DIR))

# GENERAL
SECRET_KEY = env("DJANGO_SECRET_KEY", default="?")
DEBUG = env.bool("DJANGO_DEBUG", False)
TIME_ZONE = env("DJANGO_TIME_ZONE", default="UTC")
LANGUAGE_CODE = "en-us"
SITE_ID = 1
USE_I18N = True
USE_L10N = True
USE_TZ = True
LOCALE_PATHS = [str(APPS_DIR)]
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"
LIST_PER_PAGE = env.int("ADMIN_LIST_PER_PAGE", default=20)
en_formats.DATETIME_FORMAT = "d/m/Y H:i"

# URLS
ROOT_URLCONF = "config.urls.api"
WSGI_APPLICATION = "config.wsgi.application"

# HOSTS
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=[])
PARENT_HOST = env("DJANGO_PARENT_HOST", default="")
ROOT_HOSTCONF = "config.hosts"
DEFAULT_HOST = "api"

# ADMIN
ADMINS = [admin.split(":") for admin in env.list("DJANGO_ADMINS", default=[])]
ADMIN_SITE_NAME = env("ADMIN_SITE_NAME", default=SITE_NAME.title())
MANAGERS = ADMINS

# INSTALLED APPS
PREVIOUS_APPS = [
    "config.apps.SidebarConfig",
    "utils.apps.UtilsConfig",
]

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.humanize",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "anymail",
    "django_extensions",
    "django_filters",
    "django_hosts",
    "graphene_django",
    "graphql_extensions",
    "import_export",
    "mathfilters",
    "ordered_model",
    "rest_framework",
    "social_django",
    "sorl.thumbnail",
    "django_elasticsearch_dsl",
]

LOCAL_APPS = [
    "bigcommerce_gateway.apps.BigCommerceGatewayConfig",
    "checkouts.apps.CheckoutsConfig",
    "checkouts.one_woocommerce.apps.OneWoocommerceConfig",
    "checkouts.one_magento.apps.OneMagentoConfig",
    "countries.apps.CountriesConfig",
    "customers.apps.CustomersConfig",
    "devices.apps.DevicesConfig",
    "fraud_rules.apps.FraudRulesConfig",
    "gateways.apps.GatewaysConfig",
    "hooks.apps.HooksConfig",
    "instalment_plans.apps.InstalmentPlansConfig",
    "merchants.apps.MerchantsConfig",
    "notifications.apps.NotificationsConfig",
    "orders.apps.OrdersConfig",
    "payment_methods.apps.PaymentMethodsConfig",
    "payment_methods.bank_accounts.apps.BankAccountConfig",
    "payment_methods.cards.apps.CardsConfig",
    "payment_methods.apple_pay.apps.ApplePayCardConfig",
    "payment_methods.virtual_cards.apps.VirtualCardsConfig",
    "payment_methods.gift_cards.apps.GiftCardsConfig",
    "payments.apps.PaymentsConfig",
    "phones.apps.PhonesConfig",
    "shopify_gateway.apps.ShopifyGatewayConfig",
    "users.apps.UsersConfig",
]

INSTALLED_APPS = PREVIOUS_APPS + DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# DATABASES
DATABASES = {
    "default": env.db("DATABASE_URL"),
}

# ELASTICSEARCH
ELASTICSEARCH_DSL = {
    "default": {"hosts": env("ELASTICSEARCH_HOST", default="elasticsearch:9200")}
}

# MIDDLEWARE
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django_hosts.middleware.HostsRequestMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    # PostPay
    "users.middleware.TimezoneMiddleware",
    "utils.middleware.SandboxMiddleware",
    # End PostPay
    "django_hosts.middleware.HostsResponseMiddleware",
]

# SECURITY
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = env("X_FRAME_OPTIONS", default="DENY")

if X_FRAME_OPTIONS:
    MIDDLEWARE.append("django.middleware.csrf.CsrfViewMiddleware")

# EMAIL
EMAIL_BACKEND = env(
    "DJANGO_EMAIL_BACKEND",
    default="anymail.backends.mailgun.EmailBackend",
)
EMAIL_USE_TLS = env.bool("DJANGO_EMAIL_USE_TLS", default=True)
DEFAULT_FROM_EMAIL = env("DJANGO_DEFAULT_FROM_EMAIL", default="")
SERVER_EMAIL = env("DJANGO_SERVER_EMAIL", default="")

ANYMAIL = {
    "MAILGUN_API_KEY": env("MAILGUN_API_KEY", default=""),
    "MAILGUN_SENDER_DOMAIN": env("MAILGUN_SENDER_DOMAIN", default=""),
}

# TEMPLATES
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [APPS_DIR("templates")],
        "OPTIONS": {
            "debug": env("DJANGO_TEMPLATE_DEBUG", default=DEBUG),
            "loaders": [
                "django.template.loaders.filesystem.Loader",
                "django.template.loaders.app_directories.Loader",
            ],
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

# PASSWORDS
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation." "MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation." "CommonPasswordValidator",
    },
]

# STATIC
STATIC_URL = "/static/"
STATIC_ROOT = ROOT_DIR("static")

MEDIA_URL = "/media/"
MEDIA_ROOT = APPS_DIR("media")

# AUTHENTICATION
AUTH_USER_MODEL = "users.User"
AUTH_USER_FACTORY = "users.factories.UserFactory"
PASSWORD_RESET_TIMEOUT = env.int(
    "PASSWORD_RESET_TIMEOUT",
    default=10 * 24 * 60 * 60,
)

AUTHENTICATION_BACKENDS = [
    "graphql_jwt.backends.JSONWebTokenBackend",
    "instalment_plans.backends.InstalmentTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]

# CACHES
REDIS_URL = env("REDIS_URL", default="redis://redis:6379/0")
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": True,
        },
    },
}

# SORL THUMBNAIL
THUMBNAIL_REDIS_URL = REDIS_URL
THUMBNAIL_FORCE_OVERWRITE = env.bool("THUMBNAIL_FORCE_OVERWRITE", True)

# CORS
CORS_ORIGIN_ALLOW_ALL = env.bool("CORS_ORIGIN_ALLOW_ALL", False)
CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST", default=[])
CORS_ALLOW_CREDENTIALS = env.bool("CORS_ALLOW_CREDENTIALS", False)
CORS_ALLOW_HEADERS = default_headers + env.tuple("CORS_ALLOW_HEADERS", default=())

# REST FRAMEWORK
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "merchants.restful.authentication.BasicAuthentication",
        "users.restful.authentication.JWTAuthentication",
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "utils.restful.renderers.VendorJSONRenderer",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
        "rest_framework.filters.SearchFilter",
    ],
    "DEFAULT_VERSIONING_CLASS": "rest_framework.versioning.AcceptHeaderVersioning",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "EXCEPTION_HANDLER": "utils.restful.views.exception_handler",
}

# GRAPHENE
GRAPHENE = {
    "MIDDLEWARE": [
        "merchants.graphql.middleware.MerchantIDMiddleware",
        "merchants.graphql.middleware.BasicAuthenticationMiddleware",
        "instalment_plans.graphql.middleware.InstalmentTokenMiddleware",
        "graphql_jwt.middleware.JSONWebTokenMiddleware",
    ],
}

# GRAHPQL EXTENSIONS
GRAPHQL_EXTENSIONS = {
    "SHOW_ERROR_MESSAGE_HANDLER": lambda error: True,
}

# JWT
GRAPHQL_JWT = {
    "JWT_COOKIE_SECURE": env.bool("JWT_COOKIE_SECURE", False),
    "JWT_VERIFY_EXPIRATION": env.bool("JWT_VERIFY_EXPIRATION", True),
    "JWT_HIDE_TOKEN_FIELDS": env.bool("JWT_HIDE_TOKEN_FIELDS", True),
    "JWT_EXPIRATION_DELTA": timedelta(
        seconds=env.int("JWT_EXPIRATION_DELTA", default=60 * 5),
    ),
    "JWT_PAYLOAD_HANDLER": "customers.jwt.jwt_payload_handler",
    "JWT_ALLOW_ANY_CLASSES": ("devices.graphql.mutations.DeleteDevice",),
    "JWT_COOKIE_SAMESITE": env("JWT_COOKIE_SAMESITE", default=None),
}

# SOCIAL AUTH
SOCIAL_AUTH_PIPELINE = [
    "social_core.pipeline.social_auth.social_details",
    "social_core.pipeline.social_auth.social_uid",
    "shopify_gateway.pipeline.associate_shopify_account",
    # 'shopify_gateway.pipeline.gateway_redirect',
]
SOCIAL_AUTH_GET_ALL_EXTRA_DATA = True

SOCIAL_AUTH_SHOPIFY_KEY = env("SHOPIFY_KEY", default="")
SOCIAL_AUTH_SHOPIFY_SECRET = env("SHOPIFY_SECRET", default="")

SOCIAL_AUTH_SHOPIFY_SCOPE = [
    "read_analytics",
    "read_checkouts",
    "read_content",
    "read_customers",
    "read_orders",
    "read_products",
    "read_shipping",
    "write_orders",
    "write_script_tags",
]

AUTHENTICATION_BACKENDS += [
    "social_core.backends.shopify.ShopifyOAuth2",
]

# LAMBDA
MJML_TO_HTML_FUNCTION_NAME = env("MJML_TO_HTML_FUNCTION_NAME", default="")
HTML_TO_PDF_FUNCTION_NAME = env("HTML_TO_PDF_FUNCTION_NAME", default="")
