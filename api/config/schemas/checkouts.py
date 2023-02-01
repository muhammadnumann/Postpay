import graphene

import bigcommerce_gateway.graphql
import checkouts.graphql
import shopify_gateway.graphql

from .common import DjangoDebugQuery


class Query(graphene.ObjectType, DjangoDebugQuery, checkouts.graphql.Query):
    """Query"""


class Mutations(graphene.ObjectType):
    edit_payment_option = checkouts.graphql.EditPaymentOption.Field()
    verify = checkouts.graphql.Verify.Field()
    check_code = checkouts.graphql.CheckCode.Field()
    resend_code = checkouts.graphql.ResendCode.Field()
    id_verify = checkouts.graphql.IDVerify.Field()
    profile = checkouts.graphql.Profile.Field()
    create_payment_method = checkouts.graphql.CreatePaymentMethod.Field()
    register_payment_method = checkouts.graphql.RegisterPaymentMethod.Field()
    delete_payment_method = checkouts.graphql.DeletePaymentMethod.Field()
    pre_approval = checkouts.graphql.PreApproval.Field()
    pay = checkouts.graphql.Pay.Field()
    pay_now_apple_pay = checkouts.graphql.PayNowApplePay.Field()

    # Third Party integrations
    create_bigcommerce_checkout = (
        bigcommerce_gateway.graphql.CreateBigCommerceCheckout.Field()
    )
    create_shopify_checkout = shopify_gateway.graphql.CreateShopifyCheckout.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
