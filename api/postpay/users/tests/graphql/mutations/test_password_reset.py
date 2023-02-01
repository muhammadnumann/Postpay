from unittest.mock import patch

import graphene
import pytest

from users import factories, graphql
from utils.graphql.test import SchemaTestCase


@pytest.mark.usefixtures("user")
class PasswordResetTests(SchemaTestCase):
    query = """
    mutation PasswordReset($input: PasswordResetInput!) {
      passwordReset(input: $input) {
        success
      }
    }"""

    class Mutation(graphene.ObjectType):
        password_reset = graphql.PasswordReset.Field()

    def setUp(self):
        self.client.schema(mutation=self.Mutation)

    @patch("users.mail.UserMessage.send")
    def test_password_reset(self, send_mock):
        result = self.execute(
            {
                "input": {
                    "email": self.user.email,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.assertTrue(result.data["passwordReset"]["success"])
        send_mock.assert_called_once_with()

    @patch("users.mail.UserMessage.send")
    def test_unknown_user(self, send_mock):
        result = self.execute(
            {
                "input": {
                    "email": factories.UserFactory.build().email,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.assertTrue(result.data["passwordReset"]["success"])
        send_mock.assert_not_called()
