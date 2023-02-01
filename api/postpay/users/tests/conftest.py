from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

import pytest

from users import factories


@pytest.fixture(scope="class")
def user(request):
    request.cls.user = factories.UserFactory()


@pytest.fixture(scope="class")
def password(request):
    request.cls.password = get_user_model().objects.make_random_password()


@pytest.fixture(scope="class")
def uid(request, user):
    request.cls.uid = urlsafe_base64_encode(
        force_bytes(request.cls.user.email),
    )


@pytest.fixture(scope="class")
def token(request, user):
    request.cls.token = default_token_generator.make_token(request.cls.user)
