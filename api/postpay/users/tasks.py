from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.translation import gettext as _

from utils.asynchronous import task

from .mail import UserMessage
from .models import User


@task
def send_reset_password_email(user_id):
    user = User.objects.get(pk=user_id)
    uid = urlsafe_base64_encode(force_bytes(user.email))
    token = default_token_generator.make_token(user)

    kwargs = {
        "user": user,
        "subject": _("Password reset on postpay.io"),
        "tags": ["users", "password-reset"],
    }
    context = {
        "token": f"{uid}-{token}",
    }
    msg = UserMessage(**kwargs)
    msg.attach_html("password_reset.mjml", context)
    msg.send()
