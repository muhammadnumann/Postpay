from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

import graphene
import pytest

from users import factories, graphql
from utils.graphql.test import SchemaTestCase


@pytest.mark.usefixtures("user", "password", "uid", "token")
class PasswordResetConfirmTests(SchemaTestCase):
    query = """
    mutation PasswordResetConfirm($input: PasswordResetConfirmInput!) {
      passwordResetConfirm(input: $input) {
        success
      }
    }"""

    class Mutation(graphene.ObjectType):
        password_reset_confirm = graphql.PasswordResetConfirm.Field()

    def setUp(self):
        self.client.schema(mutation=self.Mutation)

    def test_password_reset_confirm(self):
        result = self.execute(
            {
                "input": {
                    "token": f"{self.uid}-{self.token}",
                    "password": self.password,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.assertTrue(result.data["passwordResetConfirm"]["success"])

    def test_common_password_reset_confirm(self):
        with self.assertSchemaRaises("password_not_validated"):
            self.execute(
                {
                    "input": {
                        "token": f"{self.uid}-{self.token}",
                        "password": "12341234",
                    },
                }
            )

    def test_short_password_reset_confirm(self):
        with self.assertSchemaRaises("password_not_validated"):
            self.execute(
                {
                    "input": {
                        "token": f"{self.uid}-{self.token}",
                        "password": "kjhdsf",
                    },
                }
            )

    def test_empty_string_password_reset_confirm(self):
        with self.assertSchemaRaises("password_not_validated"):
            self.execute(
                {
                    "input": {
                        "token": f"{self.uid}-{self.token}",
                        "password": "",
                    },
                }
            )

    def test_none_to_password_reset_confirm(self):
        result = self.execute(
            {
                "input": {
                    "token": f"{self.uid}-{self.token}",
                    "password": None,
                },
            }
        )
        self.assertIsNotNone(result.errors)

    def test_malformed_token(self):
        with self.assertSchemaRaises("invalid"):
            self.execute(
                {
                    "input": {
                        "token": "",
                        "password": self.password,
                    },
                }
            )

    def test_unknown_user(self):
        uid = urlsafe_base64_encode(
            force_bytes(factories.UserFactory.build().email),
        )
        result = self.execute(
            {
                "input": {
                    "token": f"{uid}-token",
                    "password": self.password,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.assertFalse(result.data["passwordResetConfirm"]["success"])

    def test_invalid_token(self):
        result = self.execute(
            {
                "input": {
                    "token": f"{self.uid}-invalid",
                    "password": self.password,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.assertFalse(result.data["passwordResetConfirm"]["success"])
