from django.contrib.auth import password_validation
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_decode
from django.utils.translation import gettext as _

import graphene
from graphql_extensions import exceptions
from graphql_extensions import types as extensions_types
from graphql_extensions.decorators import login_required

from ..models import User
from ..tasks import send_reset_password_email
from . import nodes


class EditUser(graphene.ClientIDMutation):
    user = graphene.Field(nodes.User)

    class Input:
        first_name = graphene.String()
        last_name = graphene.String()
        phone = graphene.String()

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, client_mutation_id=None, **input):

        user = info.context.user

        for field, value in input.items():
            if value is not None:
                setattr(user, field, value)

        user.save()
        return cls(user=user)


class ChangePassword(graphene.ClientIDMutation):
    user = graphene.Field(nodes.User)

    class Input:
        old_password = graphene.String(required=True)
        password = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, old_password, password, **input):

        user = info.context.user

        if not user.check_password(old_password):
            raise exceptions.ValidationError(_("Old password is not valid."))

        try:
            password_validation.validate_password(password, user)
        except ValidationError as e:
            error = e.args[0][0]
            raise exceptions.ValidationError(error.message, code=error.code)

        user.set_password(password)
        user.save(update_fields=["password"])
        return cls(user=user)


class PasswordReset(graphene.ClientIDMutation):
    success = graphene.Boolean(required=True)

    class Input:
        email = extensions_types.Email(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, email, **input):
        try:
            user = User.objects.active().get(email__iexact=email)
        except User.DoesNotExist:
            """Don't raise exception"""
        else:
            send_reset_password_email(user.pk)
        return cls(success=True)


class PasswordResetConfirm(graphene.ClientIDMutation):
    success = graphene.Boolean(required=True)

    class Input:
        token = graphene.String(required=True)
        password = graphene.String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, token, password, **input):
        success = False

        try:
            uid, token = token.split("-", 1)
        except ValueError:
            raise exceptions.ValidationError(_("Invalid token."))

        email = urlsafe_base64_decode(uid).decode()

        try:
            user = User.objects.active().get(email=email)
        except User.DoesNotExist:
            """Don't raise exception"""
        else:
            try:
                password_validation.validate_password(password, user)
            except ValidationError as e:
                error = _(" ".join(e))
                raise exceptions.ValidationError(error, code="password_not_validated")
            else:
                if default_token_generator.check_token(user, token):
                    success = True
                    user.set_password(password)
                    user.save()

        return cls(success=success)
