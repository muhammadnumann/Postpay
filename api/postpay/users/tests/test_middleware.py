from unittest.mock import Mock

from django.http import JsonResponse
from django.test import RequestFactory, TestCase
from django.utils import timezone

import pytest

from users.middleware import TimezoneMiddleware


@pytest.mark.usefixtures("user")
class TimezoneMiddlewareTests(TestCase):
    def setUp(self):
        self.request_factory = RequestFactory()
        self.get_response_mock = Mock(return_value=JsonResponse({}))
        self.middleware = TimezoneMiddleware(self.get_response_mock)

    def test_timezone_activation(self):
        request = self.request_factory.get("/")
        request.user = self.user

        self.middleware(request)

        self.get_response_mock.assert_called_once_with(request)
        self.assertEqual(timezone.get_current_timezone(), self.user.timezone)
