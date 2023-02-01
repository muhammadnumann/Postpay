import informationSvg from '../assets/svgs/information.svg';
import postpayLogoSvg from '../assets/svgs/postpay-logo-en.svg';
import postpayLogoBlackSvg from '../assets/svgs/postpay-logo-black-en.svg';

const postpayLogo = (style = '') =>
  `<div class="postpay-logo-wrapper ${style}">${postpayLogoSvg}</div>`;

const postpayLogoBlack = (style = '') =>
  `<div class="postpay-logo-wrapper ${style}">${postpayLogoBlackSvg}</div>`;

export default {
  postpay: `${postpayLogo('large')}`,
  ProceedToPostpay: 'Proceed to Postpay',
  YourOrderIs: 'Your order is {status}',
  PaymentMethodNotAvailable: 'Payment method is not available.',
  PaymentMaxAmount: 'Postpay is available for order amount up to {maxAmount}',
  PayHalfNextMonth: 'Pay half next month!',
  PayHalfLater: 'Pay half {time} later!',
  PayIn2: 'Pay in 2',
  PayIn4: 'Pay in 4',
  PayIn8: 'Pay in 8',
  PayAmountToday: 'Pay {moneyAmount} today',
  PayAmountTime: 'Pay {moneyAmount} in {time}',
  OR: 'OR',
  InterestFreeInstalment: `Or {numInstalments} interest-free instalments {instalmentDelta} of {moneyAmount}`,
  ZeroInterestZeroFees: 'Zero interest. Zero fees.',
  RedirectToPostpayFillPaymentInformation: `This will redirect you to <span class="postpay-brand postpay-link">${postpayLogo(
    'small'
  )}</span> where you will fill out your payment information.`,
  ApprovedDirectedBackOurSide:
    'Once approved you will be directed back to our site to complete your order.',
  SecureCheckoutCreditDebit: 'Secure checkout with your Credit or Debit card',
  UsedPostpayBefore:
    'Used postpay before? Verify your account using your phone number and pay in <strong>one click</strong>',
  SecurePaymentPoweredByPostpay: `Secure Payments powered by <a href="https://postpay.io" target="_blank" class="postpay-brand postpay-link">${postpayLogo()}</a>`,

  InfoSubHeadline: '{numInstalments} interest-free {instalmentDelta} payments',
  SignUpInSeconds: 'Sign up in seconds.',
  SignUpInSecondsDescription:
    'No long forms and instant approval. Valid for orders up to {maxAmount}.',
  SignUpInSecondsDescriptionKSA:
    'No long forms to fill. You will receive an instant approval decision.',
  SplitYourPurchase: 'Split your purchase in {numInstalments}.',
  SplitYourPurchaseDescription:
    'First payment is processed today. Remaining {remainingNumInstalments} payments are processed {instalmentDelta}.',
  SplitYourPurchaseDescriptionKSA:
    'First payment is processed today. Remaining {remainingNumInstalments} payments are paid {instalmentDelta}.',
  NoInterestNoFee: 'No interest. No fees.',
  NoInterestNoFeeDescription:
    'Postpay is always interest-free and you only pay for what you purchase. No unnecessary fees.',
  InfoModalAction: `Select <a href="https://postpay.io" target="_blank" class="postpay-brand postpay-link">${postpayLogo(
    'small'
  )}</a> at checkout.`,
  InfoModalTerm: `All you need to apply is your debit or credit card. You must be over 18 and a UAE resident. <a href="https://postpay.io/terms" target="_blank" class="underline">Terms and Conditions apply.</a>`,
  InfoModalTermKSA: `All you need to apply is your debit or credit card. You must be over 18 and a KSA or UAE resident. <a href="https://postpay.io/terms" target="_blank" class="underline">Terms and Conditions apply.</a>`,
  InfoModalContact: `You can reach us on <a class="postpay-support-email" href="mailto:support@postpay.io">support@postpay.io</a> or +971-4215-6555.`,
  InfoModalContactKSA: `You can reach us on <a class="postpay-support-email" href="mailto:support@postpay.io">support@postpay.io</a> or +966 (0) 115201141`,
  PaymentSummaryNoticeText:
    'Always 0% interest and no fees when you pay on time',
  PayAmount: 'Pay {amount}',
  HereYourPaymentSchedule: 'Here’s your payment schedule:',
  PaymentSummary: 'Payment summary',
  PayMoneyInSchedule: 'Pay {moneyAmount} in {scheduleLabel}',
  PayHalfToday: 'Pay half today',
  PayMoneyToday: 'Pay {moneyAmount} today',
  InterestFeeInstalmentWithPostpay: `{numInstalments} interest-free instalments {instalmentDelta} of {moneyAmount} with <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo()} ${informationSvg}</a>`,
  OrInterestFeeInstalmentWithPostpay: `Or {numInstalments} interest-free instalments {instalmentDelta} of {moneyAmount} with <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo()} ${informationSvg}</a>`,
  PayInNumber: 'Pay in {number}',
  AlmostDone: 'Almost Done!',
  TextDescForNumInst3:
    'Your purchase will be split into {numInstalments} installments once you complete Postpay checkout.',
  TextDescForNumInst1:
    'Your purchase will be finalised once you complete Postpay checkout',
  Redirecting: 'Redirecting you back to the retailer',
  PayNowTheRestLaterWithPostpay: `Pay {moneyAmount} now, pay the rest later with <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo()} ${informationSvg}</a>`,
  InterestFreeInstallment: '{numInstalments} interest-free installments.',
  PayTodayTheRestIn: `Pay {moneyAmount} today, pay the rest in <span>{numInstalments} monthly installments</span>`,
  InterestFreeInstallmentOf: `<span>{numInstalments} monthly</span> interest free installments of {moneyAmount}`,
  BuyNowPayTheRestIn: `Buy now, pay the rest in {numInstalments} monthly installments`,
  BuyNowPayIn: `Buy now, pay in {numInstalments} monthly installments`,
  OrInterestFreePaymentsWithPostpay: `Or <span>{numInstalments}</span> interest-free payments of {moneyAmount} with <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo()} ${informationSvg}</a>`,
  InterestFreePaymentsWithPostpay: `<span>{numInstalments}</span> interest-free payments of {moneyAmount} with <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo()} ${informationSvg}</a>`,

  OrInterestFreeProductPaymentsWithPostpay: `<div class='postpay-paymet-text'>or <span>{numInstalments}</span> interest-free payments of {moneyAmount} <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${informationSvg}</a> </div> <a onclick= href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogoBlack()}</a>`,
  InterestFreeProductPaymentsWithPostpay: `<div class='postpay-paymet-text'><span>{numInstalments}</span> interest-free payments of {moneyAmount} <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${informationSvg}</a> </div> <a  href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogoBlack()}</a>`,
};
