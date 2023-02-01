from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

from graphql_jwt.exceptions import JSONWebTokenError
from graphql_jwt.utils import get_http_authorization
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication


class JWTAuthentication(BaseAuthentication):
    keyword = "JWT"

    def authenticate(self, request):
        token = get_http_authorization(request)

        if token is None:
            return None

        return self.authenticate_credentials(request, token)

    def authenticate_credentials(self, request, token):
        try:
            user = authenticate(request=request)
        except JSONWebTokenError as e:
            raise exceptions.AuthenticationFailed(str(e))

        if user is None:
            raise exceptions.AuthenticationFailed(_("Invalid token."))

        return (user, None)

    def authenticate_header(self, request):
        return self.keyword
