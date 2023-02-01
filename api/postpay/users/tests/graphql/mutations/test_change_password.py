import graphene
import pytest

from users import graphql
from utils.graphql.test import SchemaTestCase


@pytest.mark.usefixtures("user", "password")
class ChangePasswordTests(SchemaTestCase):
    query = """
    mutation ChangePassword($input: ChangePasswordInput!) {
      changePassword(input: $input) {
        user {
          id
        }
      }
    }"""

    class Mutation(graphene.ObjectType):
        change_password = graphql.ChangePassword.Field()

    def setUp(self):
        self.client.schema(mutation=self.Mutation)
        self.client.authenticate(self.user)

    def test_change_password(self):
        result = self.execute(
            {
                "input": {
                    "oldPassword": "dolphins",
                    "password": self.password,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(self.password))

    def test_invalid_old_password(self):
        with self.assertSchemaRaises("invalid"):
            self.execute(
                {
                    "input": {
                        "oldPassword": "invalid",
                        "password": self.password,
                    },
                }
            )

    def test_invalid_new_password(self):
        with self.assertSchemaRaises("password_too_short"):
            self.execute(
                {
                    "input": {
                        "oldPassword": self.password,
                        "password": "",
                    },
                }
            )
