from django.http import JsonResponse


def handler404(request, exception=None):
    return JsonResponse(
        {
            "error": {
                "code": "not_found",
                "message": "The resource was not found.",
            },
        }
    )
