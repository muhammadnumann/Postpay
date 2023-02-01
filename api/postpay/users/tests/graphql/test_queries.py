import graphene
import pytest

import users.graphql
from utils.graphql.test import SchemaTestCase


@pytest.mark.usefixtures("user")
class ViewerTests(SchemaTestCase):
    query = """
    {
      viewer {
        email
      }
    }"""

    class Query(graphene.ObjectType, users.graphql.Query):
        """Test Query"""

    def setUp(self):
        self.client.schema(query=self.Query)
        self.client.authenticate(self.user)

    def test_viewer(self):
        response = self.execute()
        data = response.data["viewer"]

        self.assertEqual(data["email"], self.user.email)
