import graphene
import graphql_jwt

import customers.graphql
import devices.graphql
import instalment_plans.graphql
import merchants.graphql
import payment_methods.gift_cards.graphql
import payment_methods.virtual_cards.graphql

from .common import DjangoDebugQuery


class Query(
    graphene.ObjectType,
    DjangoDebugQuery,
    customers.graphql.Query,
    instalment_plans.graphql.Query,
    merchants.graphql.CustomersQuery,
):
    """Query"""


class Mutations(graphene.ObjectType):
    # Signin
    signin = customers.graphql.Signin.Field()
    check_code = customers.graphql.CheckCode.Field()
    id_verify = customers.graphql.IDVerify.Field()
    delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()

    # Payment Methods
    create_payment_method = customers.graphql.CreatePaymentMethod.Field()
    register_payment_method = customers.graphql.RegisterPaymentMethod.Field()
    delete_payment_method = customers.graphql.DeletePaymentMethod.Field()

    # Instalment plans
    prepay_instalment_plan = instalment_plans.graphql.PrepayInstalmentPlan.Field()

    prepay_next_instalment = instalment_plans.graphql.PrepayNextInstalment.Field()

    pay_instalment = instalment_plans.graphql.PayInstalment.Field()

    pay_unpaid_instalments = instalment_plans.graphql.PayUnpaidInstalments.Field()

    change_payment_method = instalment_plans.graphql.ChangePaymentMethod.Field()

    # Virtual Cards
    virtual_card_approval = (
        payment_methods.virtual_cards.graphql.VirtualCardApproval.Field()
    )

    pay_virtual_card = payment_methods.virtual_cards.graphql.PayVirtualCard.Field()

    deactivate_virtual_card = (
        payment_methods.virtual_cards.graphql.DeactivateVirtualCard.Field()
    )

    # Gift Cards
    gift_card_approval = payment_methods.gift_cards.graphql.GiftCardApproval.Field()
    pay_gift_card = payment_methods.gift_cards.graphql.PayGiftCard.Field()

    # Profile
    edit_profile = customers.graphql.EditProfile.Field()
    edit_settings = customers.graphql.EditSettings.Field()
    upload_avatar = customers.graphql.UploadAvatar.Field()
    change_phone = customers.graphql.ChangePhone.Field()
    change_phone_code = customers.graphql.ChangePhoneCode.Field()

    # Devices
    register_device = devices.graphql.RegisterDevice.Field()
    delete_device = devices.graphql.DeleteDevice.Field()
    create_firebase_token = customers.graphql.CreateFirebaseToken.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
