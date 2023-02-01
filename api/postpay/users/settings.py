import environ

from settings import Settings

env = environ.Env()

DEFAULTS = {
    "AVATAR_UPLOAD_DIR": env(
        "USER_AVATAR_UPLOAD_DIR",
        default="avatars/%Y/%m/%d",
    ),
}

user_settings = Settings("USERS", DEFAULTS)
