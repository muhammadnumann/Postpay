from django.conf import settings
from django.contrib import admin

from sidebar import apps
from sidebar.menu import Row, Section


class SidebarConfig(apps.SidebarConfig):
    menu = (
        Section(
            "Customers",
            rows=[
                Row(model="customers.customer"),
                Row(model="fraud_rules.freezingrule"),
            ],
            icon="fas fa-user-astronaut",
        ),
        Section(
            "Checkouts",
            rows=[
                Row(model="checkouts.checkout"),
                Row(model="orders.order"),
                Row(model="orders.address"),
                Row(model="orders.itemincart"),
            ],
            icon="fas fa-shopping-cart",
        ),
        Section(
            "Shopping App",
            rows=[
                Row(model="virtual_cards.merchant"),
                Row(model="virtual_cards.order"),
                Row(model="virtual_cards.virtualcard"),
                Row(model="gift_cards.giftcard"),
                Row(model="virtual_cards.wallet"),
                Row(model="virtual_cards.transaction"),
            ],
            icon="fas fa-mobile-alt",
        ),
        Section(
            "Customer Payments",
            rows=[
                Row(model="instalment_plans.instalmentplan"),
                Row(model="instalment_plans.instalment"),
                Row(model="instalment_plans.downpayment"),
                Row(model="instalment_plans.recovery"),
                Row(model="instalment_plans.prepayment"),
                Row(model="instalment_plans.penaltyfee"),
                Row(model="orders.refund"),
            ],
            icon="fas fa-dollar-sign",
        ),
        Section(
            "Merchants",
            rows=[
                Row(model="merchants.merchant"),
            ],
            icon="fas fa-store",
        ),
        Section(
            "Retailer Settlements",
            rows=[
                Row(model="payments.transaction"),
                Row(model="payments.payment"),
                Row(model="payments.invoice"),
            ],
            icon="fas fa-file-invoice-dollar",
        ),
        Section(
            "Payment Gateways",
            rows=[
                Row(model="gateways.gateway"),
                Row(model="payment_methods.transaction"),
            ],
            icon="fas fa-network-wired",
        ),
        Section(
            "Payment Methods",
            rows=[
                Row(model="cards.card"),
                Row(model="cards.bincode"),
                Row(model="apple_pay.applepaycard", label="Apple Pay"),
            ],
            icon="fas fa-credit-card",
        ),
        Section(
            "Users",
            rows=[
                Row(model="users.user"),
                Row(model="auth.group"),
            ],
            icon="fas fa-users",
        ),
        Section(
            "Settings",
            rows=[
                Row(model="sites.site"),
                Row(model="countries.country"),
                Row(model="countries.currency"),
                Row(model="phones.phone"),
                Row(model="devices.device"),
            ],
            icon="fa fa-gear",
        ),
    )

    def __init__(self, app_name, app_module):
        admin.ModelAdmin.list_per_page = settings.LIST_PER_PAGE
        super().__init__(app_name, app_module)
