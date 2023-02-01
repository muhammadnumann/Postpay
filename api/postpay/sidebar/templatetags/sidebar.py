from django import template

from ..menu import MenuManager

register = template.Library()


@register.simple_tag(takes_context=True)
def get_menu(context):
    return MenuManager(context)


@register.filter
def is_active(section, path):
    return any(row.url in path for row in section.rows)
