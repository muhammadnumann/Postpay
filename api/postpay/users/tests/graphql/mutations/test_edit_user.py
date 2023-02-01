import graphene
import pytest

from users import factories, graphql
from utils.graphql.test import SchemaTestCase


@pytest.mark.usefixtures("user")
class EditUserTests(SchemaTestCase):
    query = """
    mutation EditUser($input: EditUserInput!) {
      editUser(input: $input) {
        user {
          firstName
        }
      }
    }"""

    class Mutation(graphene.ObjectType):
        edit_user = graphql.EditUser.Field()

    def setUp(self):
        self.client.schema(mutation=self.Mutation)
        self.client.authenticate(self.user)

    def test_edit_user(self):
        user = factories.UserFactory.build()

        result = self.execute(
            {
                "input": {
                    "firstName": user.first_name,
                },
            }
        )

        self.assertIsNone(result.errors)
        self.assertEqual(self.user.first_name, user.first_name)
