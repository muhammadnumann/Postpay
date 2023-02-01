from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver

from utils.translation import get_language_from_request


@receiver(user_logged_in)
def set_user_language(sender, user, request=None, **kwargs):
    if request is not None and not user.language:
        user.language = get_language_from_request(request)
        user.save(update_fields=["language"])
