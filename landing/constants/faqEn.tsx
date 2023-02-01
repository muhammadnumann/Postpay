import React from "react";
import {
  DECLINED_PURCHASE_ROUTE,
  PCI_DSS_ROUTE,
  SHOP_DIRECTORY_ROUTE,
  TERMS_ROUTE,
} from "../helpers/url";
import { IFaqListItem } from "../pages/contact-us/ShopperFAQs";

const faqList: Array<IFaqListItem> = [
  {
    title: "Postpay",
    data: [
      {
        question: "What is Postpay?",
        answer: (
          <p className="content-accordion-text">
            Postpay gives you the flexibility to pay over time with three
            monthly payments, without interest and fees. The first payment will
            be charged at the time of the purchase, followed by the remaining
            two payments over the next two months.
          </p>
        ),
      },
      {
        question: "How to use Postpay?",
        answer: (
          <p className="content-accordion-text">
            Simply select Postpay at checkout across any of our partnered
            retailers to pay for your purchase in three split payments. You will
            be automatically directed to Postpay, where you will enter a quick
            identifity verification process before proceeding with your chosen
            method of payment.
          </p>
        ),
      },
      {
        question: "Who can use Postpay?",
        answer: (
          <p className="content-accordion-text">
            To use Postpay, you must be over 18 years old, and you must have a
            valid ID and a valid mobile number from the UAE or KSA
          </p>
        ),
      },
      {
        question: "Where can I use Postpay?",
        answer: (
          <p className="content-accordion-text">
            <a className="content-accordion-link" href={SHOP_DIRECTORY_ROUTE}>
              CLICK HERE
            </a>{" "}
            to view a fulll list of partnered retailers that offer Postpay at
            checkout.
          </p>
        ),
      },
      {
        question: "Are there any charges for Postpay?",
        answer: (
          <p className="content-accordion-text">
            There are no charges or fees, providing you pay monthly payments on
            time!
          </p>
        ),
      },
      {
        question: "How much can I spend with Postpay?",
        answer: (
          <p className="content-accordion-text">
            Your limit will depend on many factors such as your history with us,
            the retailer you are trying to purchase with and if you have any
            ongoing payments.
          </p>
        ),
      },
    ],
  },
  {
    title: "One by Postpay",
    data: [
      {
        question: "What is One by Postpay?",
        answer: (
          <p className="content-accordion-text">
            One by Postpay is an express checkout. We will remember your address
            and payment information so that you can checkout with ease across
            all partnered retailers. You'll no longer have to complete arduous
            forms or remember a password. Furthermore, One gives you flexibility
            to pay in one go or over time in monthly payments.
          </p>
        ),
      },
      {
        question: "How to use One by Postpay?",
        answer: (
          <p className="content-accordion-text">
            You'll see One by Postpay next to any item of our partnered
            retailers. Once you select "Buy with One", you will be redirected to
            our express checkout, and you will need to enter your KSA or UAE
            mobile number to receive an OTP. After that, just enter your address
            and select your payment method to complete your purchase.
          </p>
        ),
      },
      {
        question: "Who can use One by Postpay?",
        answer: (
          <p className="content-accordion-text">
            You must be over 18 years old, and you must have a valid ID and a
            valid mobile number from the UAE or KSA.
          </p>
        ),
      },
      {
        question: "Are there any charges for One by Postpay?",
        answer: (
          <p className="content-accordion-text">
            There are no charges or fees, providing you pay monthly payments on
            time!
          </p>
        ),
      },
      {
        question: "Can I pay in instalments with One by Postpay?",
        answer: (
          <p className="content-accordion-text">
            Yes. You have flexibility to pay in one go or over time across 3
            monthly payments. Interest-free.
          </p>
        ),
      },
      {
        question: "How can I see the delivery charges?",
        answer: (
          <p className="content-accordion-text">
            After selecting the item you want to purchase and clicking on One,
            you will need to enter your mobile number and the OTP sent to your
            number. After that, you will be able to enter your delivery address
            and to see delivery fees.
          </p>
        ),
      },
      {
        question: "How can I change my address for future orders?",
        answer: (
          <p className="content-accordion-text">
            You can update your delivery address at checkout.
          </p>
        ),
      },
      {
        question:
          "My order is already confirmed, and I entered the wrong address for the delivery. How can I change it?",
        answer: (
          <p className="content-accordion-text">
            To update your delivery address, please kindly contact the retailer
            directly, as we are not responsible for delivery and fulfilment.
          </p>
        ),
      },
      {
        question: "Are there any spending limits?",
        answer: (
          <p className="content-accordion-text">
            Your limit will depend on many factors such as your history with us,
            the retailer you are trying to purchase with and if you have any
            ongoing payments.
          </p>
        ),
      },
    ],
  },
  {
    title: "Delivery",
    data: [
      {
        question: "When is my order going to be delivered?",
        answer: (
          <p className="content-accordion-text">
            For updates regarding your pending order, please contact the
            retailer directly as One is not responsible for delivery and
            fulfilment.
          </p>
        ),
      },
      {
        question:
          "My order is already confirmed, and I entered the wrong address for the delivery. How can I change it?",
        answer: (
          <p className="content-accordion-text">
            To update your delivery address, please kindly contact the retailer
            directly. One does not directly handle delivery and fulfilment.
          </p>
        ),
      },
    ],
  },
  {
    title: "Refunds, Cancellations, and exchanges",
    data: [
      {
        question: "How to cancel or return items in my order?",
        answer: (
          <p className="content-accordion-text">
            You will need to contact the retailer directly to have any orders
            returned or cancelled. Please note that the terms and conditions
            from the merchant will apply on the returns/cancellation requests.
          </p>
        ),
      },
      {
        question:
          "I bought different items and I have returned just part of the order to the store. How can I receive the partial refund?",
        answer: (
          <p className="content-accordion-text">
            If you receive a partial refund, the amount refunded by the retailer
            will be applied into your last payment, backwards. We will also send
            you an email with all the details of the partial refund.
          </p>
        ),
      },
      {
        question:
          "I have cancelled my entire order. How can I receive the refund?",
        answer: (
          <p className="content-accordion-text">
            Once the full refund is requested by the merchant, it can take up to
            2 working days for the cancellation to be reflected on your
            dashboard. As soon as the refund is processed from our side, we will
            send you an updated email with the refund information. It can take
            from 2 to 20 working days for the refund to be reflected into your
            account, depending on your bank.
          </p>
        ),
      },
      {
        question: "How can I exchange items in my order?",
        answer: (
          <p className="content-accordion-text">
            You will need to contact the retailer directly to have any orders
            exchanged. Please note that the terms and conditions from the
            merchant will apply on the returns/cancellation requests.
          </p>
        ),
      },
      {
        question: "How long does it take for me to receive the refund?",
        answer: (
          <p className="content-accordion-text">
            Once the refund is initiated by the retailer, and you receive the
            confirmation email from Postpay, it can take from 2 to 20 working
            days, depending on your bank, for the amount to be reflected into
            your account.
          </p>
        ),
      },
    ],
  },
  {
    title: "Payments",
    data: [
      {
        question: "What are the payment methods accepted?",
        answer: (
          <>
            <p className="content-accordion-text">
              Postpay accepts major debt and credit cards such as Visa and
              Mastercard. Prepaid cards are not accepted.
            </p>
          </>
        ),
      },
      {
        question: "I can't pay on time. What should I do?",
        answer: (
          <>
            <p className="content-accordion-text">
              Kindly contact customer support before your scheduled payment date
              for further assistance.
            </p>
          </>
        ),
      },
      {
        question: "Can I change my scheduled payment date?",
        answer: (
          <p className="content-accordion-text">
            It is not possible extend the date for scheduled payments, however a
            pending balance can be paid early from your account.
          </p>
        ),
      },
      {
        question: "What happens if I can't pay on time?",
        answer: (
          <p className="content-accordion-text">
            We will send you a reminder of the payment by email. In case the
            payment fails, a late payment fee will be added into your
            instalment.
          </p>
        ),
      },
      {
        question: "Are there any payment fees if I can't pay on time?",
        answer: (
          <p className="content-accordion-text">
            One day after the due date a late payment fee of SAR/AED 25 is added
            into your instalment. After 10 days of the due date the system will
            try to automatically deduct the amount again, and if the payment
            fails, another SAR/AED 30 are added into your instalment.
          </p>
        ),
      },
      {
        question: "How to change the registered card for payment?",
        answer: (
          <p className="content-accordion-text">
            You can change your registered card for payment anytime within your
            account. In the customer dashboard, in your Postpay App or on the
            website, click on Purchases and select the instalment that you would
            like to
          </p>
        ),
      },
      {
        question: "Why did you just charge me twice for the same amount?",
        answer: (
          <p className="content-accordion-text">
            We may need to perform a pre-authorization to ensure the card is not
            fraudulent. If this pre-authorization reflects as a notification
            from your bank, please note that it is immediately voided by us and
            we do not receive any funds, and you will be able to see in your
            bank statement that no amount was charged by us.
          </p>
        ),
      },
      {
        question:
          "Is there a limit for the amount I can spend with my purchase?",
        answer: (
          <p className="content-accordion-text">
            Your limit will depend on many factors such as your history with us,
            the retailer you are trying to purchase with and if you have any
            ongoing payments.
          </p>
        ),
      },
      {
        question: "Can I have more than one purchase at the same time?",
        answer: (
          <p className="content-accordion-text">
            You can! Kindly note the maximum purchases can limit will vary for
            different partnered retailers.
          </p>
        ),
      },
    ],
  },
  {
    title: "User account and setting",
    data: [
      {
        question:
          "How can I change my registered information? (email, phone number, ID)?",
        answer: (
          <p className="content-accordion-text">
            Please contact our Customer Support team and they will be able in
            order to have any registered information changed.
          </p>
        ),
      },
      {
        question: "How can I contact the Customer Support Team in the UAE?",
        answer: (
          <p className="content-accordion-text">
            You can contact us by email at support@postpay.io, or at +971 4 215
            6555. Our call center is open from Sunday to Friday, from 9am to 6pm
            (UAE time).
          </p>
        ),
      },
      {
        question: "How can I contact the Customer Support Team in KSA?",
        answer: (
          <p className="content-accordion-text">
            You can contact us by email at support@postpay.io, or at +966 11 520
            1141. Our call center is open from Sunday to Friday, from 8am to 5pm
            (KSA time).
          </p>
        ),
      },
    ],
  },
  {
    title: "Declined purchases",
    data: [
      {
        question: "Why my purchase was declined?",
        answer: (
          <>
            <p className="content-accordion-text content-accordion-spacing">
              If your purchase was declined, there are a few questions to
              consider:
            </p>
            <ul>
              <li className="content-accordion-list-item">
                Do you meet all the eligibility criteria set out in our{" "}
                <a className="content-accordion-link" href={TERMS_ROUTE}>
                  purchase terms
                </a>
                ?
              </li>
              <li className="content-accordion-list-item">
                Do you have sufficient funds for the first payment?
              </li>
              <li className="content-accordion-list-item">
                Are you a first-time customer? Order value limits may vary from
                person to person based on your transaction history with us.
              </li>
              <li className="content-accordion-list-item">
                Do you have ongoing payments with Postpay? If so, settling those
                could help to increase your likelihood of approval
              </li>
              <li className="content-accordion-list-item">
                Is the overall value of your new order too high?
              </li>
              <li className="content-accordion-list-item">
                Have you tried to complete the orders too many times? This might
                result in your order being declined as a result of our fraud
                prevention.
              </li>
            </ul>
            <p className="content-accordion-text content-accordion-spacing">
              Please note that we assess each purchase order individually and
              this takes into account a lot of varying factors. For example, if
              you are declined from a specific retailer today, you could be
              approved for the same retailer tomorrow.
            </p>
            <p className="content-accordion-text">
              For more information about a declined purchase, please{" "}
              <a
                href={DECLINED_PURCHASE_ROUTE}
                className="content-accordion-link"
              >
                CLICK HERE
              </a>
            </p>
          </>
        ),
      },
      {
        question: "What should I do if my purchase was declined?",
        answer: (
          <>
            <p className="content-accordion-text content-accordion-spacing">
              If you are a returning customer, the history of your payments and
              your number of ongoing payments are taken into consideration.
              Settling those can help increase your likelihood of approval.
            </p>
            <p className="content-accordion-text">
              In case you don't have any ongoing payments, or if you are a new
              customer, please contact us at +971 4 215 6555 or at +966 11 520
              1141, so our Customer Support Team can assist you better.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Fraud and Security",
    data: [
      {
        question: "Is Postpay Secure?",
        answer: (
          <p className="content-accordion-text">
            Your security is of utmost importance to us. We are a PCI DSS
            compliant company which means that we undergo strict compliance
            tests from the the Payment Card Industry (PCI) to ensure that your
            data is safely stored in our systems. Please visit our PCI DSS page{" "}
            <a href={PCI_DSS_ROUTE} className="content-accordion-link">
              here
            </a>{" "}
            to learn more.
          </p>
        ),
      },
      {
        question: "Is One secure?",
        answer: (
          <p className="content-accordion-text">
            Your security is of utmost importance to us. We are a PCI DSS
            compliant company which means that we undergo strict compliance
            tests from the the Payment Card Industry (PCI) to ensure that your
            data is safely stored in our systems. Please visit our PCI DSS page{" "}
            <a href={PCI_DSS_ROUTE} className="content-accordion-link">
              here
            </a>{" "}
            to learn more.
          </p>
        ),
      },
      {
        question:
          "I received a charge and I can't remember completing any purchases. What should I do?",
        answer: (
          <p className="content-accordion-text">
            Please contact our Customer Support Team at +971 4 215 6555 or at
            +966 11 520 1141, or at support@postpay.io, so they can assist you
            further.
          </p>
        ),
      },
    ],
  },
];

export default faqList;
