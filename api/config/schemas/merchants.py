import graphene
import graphql_jwt

import checkouts.graphql
import hooks.graphql
import merchants.graphql
import orders.graphql
import payments.graphql
import users.graphql

from .common import DjangoDebugQuery


class Query(
    graphene.ObjectType,
    DjangoDebugQuery,
    hooks.graphql.Query,
    merchants.graphql.MerchantsQuery,
    orders.graphql.Query,
    payments.graphql.Query,
):
    """Query"""


class Mutations(graphene.ObjectType):
    # Users
    edit_user = users.graphql.EditUser.Field()
    change_password = users.graphql.ChangePassword.Field()
    password_reset = users.graphql.PasswordReset.Field()
    password_reset_confirm = users.graphql.PasswordResetConfirm.Field()

    # JWT
    token_auth = merchants.graphql.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()

    # Orders
    create_checkout = checkouts.graphql.CreateCheckout.Field()
    capture = orders.graphql.Capture.Field()
    refund = orders.graphql.Refund.Field()
    cancel_refund = orders.graphql.CancelRefund.Field()
    payment_link = checkouts.graphql.PaymentLink.Field()

    # Hooks
    create_hook = hooks.graphql.CreateHook.Field()
    edit_hook = hooks.graphql.EditHook.Field()
    delete_hook = hooks.graphql.DeleteHook.Field()

    # Accounts
    add_accounts = merchants.graphql.AddAccounts.Field()
    delete_accounts = merchants.graphql.DeleteAccounts.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
