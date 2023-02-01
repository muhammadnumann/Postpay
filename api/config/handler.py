import base64
import json

from zappa import handler


def lambda_handler(event, context):
    decoded = event.copy()
    body = decoded.get("body")

    if body is not None:
        try:
            decoded["body"] = base64.b64decode(body).decode()
        except UnicodeDecodeError:
            pass

    handler.logger.info(decoded)
    response = handler.lambda_handler(event, context)

    if response is not None:
        body = response.get("body")

        if body is not None:
            try:
                body = json.loads(body)
            except ValueError:
                pass
            else:
                if "errors" in body:
                    handler.logger.warning(body)
    return response
