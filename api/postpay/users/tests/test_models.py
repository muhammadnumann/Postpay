from django.test import TestCase

import pytest


@pytest.mark.usefixtures("user")
class UserTests(TestCase):
    def test_str(self):
        self.assertEqual(str(self.user), self.user.email)

    def test_get_full_name(self):
        self.assertIn(self.user.first_name, self.user.get_full_name())

    def test_get_short_name(self):
        self.assertEqual(self.user.get_short_name(), self.user.first_name)
