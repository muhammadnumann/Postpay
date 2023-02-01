import graphene

import checkouts.graphql
import customers.graphql

from .common import DjangoDebugQuery


class Query(
    graphene.ObjectType,
    DjangoDebugQuery,
    customers.graphql.Query,
    checkouts.graphql.Query,
):
    """Query"""


class Mutations(graphene.ObjectType):
    # Signin
    signin = customers.graphql.Signin.Field()
    check_code = customers.graphql.CheckCode.Field()
    edit_profile = customers.graphql.EditProfile.Field()
    email_verify = customers.graphql.EmailVerify.Field()

    # Checkout
    create_payment_method = customers.graphql.CreatePaymentMethod.Field()
    register_payment_method = customers.graphql.RegisterPaymentMethod.Field()
    pre_approval = checkouts.graphql.PreApproval.Field()
    pay = checkouts.graphql.Pay.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
