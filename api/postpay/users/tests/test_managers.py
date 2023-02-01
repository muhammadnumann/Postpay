from django.test import TestCase

import pytest

from users import factories, models


@pytest.mark.usefixtures("user")
class UserQuerySetTests(TestCase):
    def test_active(self):
        self.assertIn(self.user, models.User.objects.active())


class CustomUserTests(TestCase):
    def test_create_user(self):
        email = factories.UserFactory.build().email
        password = models.User.objects.make_random_password()
        user = models.User.objects.create_user(email=email, password=password)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_create_user_error(self):
        password = models.User.objects.make_random_password()

        with self.assertRaises(ValueError):
            models.User.objects.create_user(email="", password=password)

    def test_create_superuser(self):
        email = factories.UserFactory.build().email
        password = models.User.objects.make_random_password()

        user = models.User.objects.create_superuser(
            email=email,
            password=password,
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.check_password(password))
