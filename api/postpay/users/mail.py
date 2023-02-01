from notifications import mail

from .apps import UsersConfig


class EmailMessage(mail.EmailMessage):
    app_name = UsersConfig.name


class UserMessage(EmailMessage):
    def __init__(self, user, *args, **kwargs):
        defaults = {
            "default_context": {
                "user": user,
                "first_name": user.first_name,
            },
            "to": [user.email],
            "metadata": {
                "user": user.pk,
            },
        }
        super().__init__(*args, **{**defaults, **kwargs})
