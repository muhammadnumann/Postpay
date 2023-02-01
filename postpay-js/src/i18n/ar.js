import informationSvg from '../assets/svgs/information.svg';
import postpayLogoSvg from '../assets/svgs/postpay-logo-ar.svg';
import postpayBlueLogoSvg from '../assets/svgs/postpay-logo-ar-blue.svg';

const postpayLogo = (style = '') =>
  `<div class="postpay-logo-wrapper ${style}">${postpayLogoSvg}</div>`;
const postpayBlueLogo = (style = '') =>
  `<div class="postpay-logo-wrapper ${style}">${postpayBlueLogoSvg}</div>`;

export default {
  AED: 'د.إ',
  SAR: '.ر.س',
  postpay: postpayLogo('large'),
  ProceedToPostpay: 'متابعة إلى بوست باي',
  YourOrderIs: 'طلبك {status}',
  OrderStatusApproved: 'الموافقة',
  OrderStatusConfirmed: 'تم التأكيد',
  OrderStatusDenied: 'تم الرفض',
  PaymentMethodNotAvailable: 'طريقة الدفع غير متوفرة',
  PaymentMaxAmount: 'بوست باي متاح لطلبات قد تصل قيمتها إلي {maxAmount}',
  PayHalfNextMonth: 'ادفع النصف الشهر القادم!',
  PayHalfLater: 'ادفع النصف {time} لاحقًا!',
  PayIn2: 'دفعتان',
  PayIn4: 'أربعة دفعات',
  PayIn8: 'ثمانية دفعات',
  PayAmountToday: 'ادفع {moneyAmount} اليوم',
  PayAmountTime: 'ادفع {moneyAmount} {time}',
  InterestFreeInstalment:
    '{numInstalments} أقساط بدون فوائد {instalmentDelta} بقيمة {moneyAmount}',
  OR: 'أو',
  ZeroInterestZeroFees: 'بدون فوائد. بدون رسوم',
  RedirectToPostpayFillPaymentInformation: `سيتم توجيهك إلى <span class="postpay-brand postpay-link">${postpayLogo()}</span> حيث سيطلب منك ملئ معلومات الدفع الخاصة بك.`,
  ApprovedDirectedBackOurSide:
    'بعد الموافقة ، سيتم توجيهك إلى موقعنا مرة أخرى لإكمال طلبك.',
  SecureCheckoutCreditDebit:
    'دفع آمن باستخدام بطاقة الائتمان أو بطاقة الخصم الخاصة بك',
  UsedPostpayBefore:
    'هل استخدمت بوست باي من قبل؟ تحقق من حسابك باستخدام رقم هاتفك وادفع <strong>بنقرة واحدة!</strong>',
  SecurePaymentPoweredByPostpay: `دفع آمن بدعم <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo(
    'small'
  )}</a>`,
  InfoSubHeadline:
    '{numInstalments} أقساط {instalmentDelta} بدون فوائد أو رسوم',
  SignUpInSeconds: 'سجل في ثواني',
  SignUpInSecondsDescription:
    'بدون ملئ أي استمارات. نضمن لك موافقة فورية لتقسيط قيمة مشترياتك حتى {maxAmount}.',
  SignUpInSecondsDescriptionKSA:
    'نضمن لك موافقة فورية لتقسيط مشترياتك لغاية .',
  SplitYourPurchase: 'قسّط مشترياتك على {numInstalments} دفعات',
  SplitYourPurchaseDescription:
    'تتم الدفعة الأولى فوراً وباقى ال {remainingNumInstalments} دفعات يتم تحصليها تلقائيا {instalmentDelta}.',
  SplitYourPurchaseDescriptionKSA:
    'يتم تحصيل القسط الأول اليوم. متبقي {remainingNumInstalments} أقساط يتم تحصيلهم {instalmentDelta}.',
  NoInterestNoFee: 'بدون فوائد. بدون رسوم',
  NoInterestNoFeeDescription:
    'لا يوجد فوائد أو رسوم مع بوست باي. ادفع مقابل ما اشتريته.',
  InfoModalAction: `أختر <a href="https://postpay.io" target="_blank" class="postpay-brand postpay-link">${postpayLogo()}</a> كطريقة الدفع الخاصة بك عند السداد بصفحة الدفع.`,
  InfoModalTerm: `كل ما عليك تقديمه هو بطاقة الخصم أو الائتمان الخاصة بك. يجب أن يكون عمرك أكثر من 18 عامًا وأن يجب أيضًا أن تكون مقيمًا بالإمارات العربية المتحدة أو بالمملكة العربية السعودية. <a href="https://postpay.io/terms" target="_blank" class="underline"> تطبق الشروط والأحكام. <a/>`,
  InfoModalTermKSA: `كل ما عليك تقديمه هو بطاقة الخصم أو الائتمان الخاصة بك. يجب أن يكون عمرك أكثر من 18 عامًا وأن يجب أيضًا أن تكون مقيمًا بالمملكة العربية السعودية أو بالإمارات العربية المتحدة. <a href="https://postpay.io/terms" target="_blank" class="underline"> تطبق الشروط والأحكام. <a/>`,
  InfoModalContact: `يمكنك التواصل معنا عن طريق <a class="postpay-support-email" href="mailto:support@postpay.io">support@postpay.io</a> أو 97142156555+.`,
  InfoModalContactKSA: `يمكنك التواصل معنا عن طريق <a class="postpay-support-email" href="mailto:support@postpay.io">support@postpay.io</a> +966 (0) أو 115201141+.`,
  PaymentSummaryNoticeText: 'بدون فوائد أو رسوم عند الدفع في الوقت المحدد',
  PayAmount: 'إدفع {amount}',
  HereYourPaymentSchedule: 'هنا جدول الدفع:',
  PaymentSummary: 'ملخص الدفع',
  PayMoneyInSchedule: 'ادفع {moneyAmount} {scheduleLabel}',
  PayHalfToday: 'ادفع النصف اليوم',
  PayMoneyToday: 'ادفع {moneyAmount} اليوم',
  InterestFeeInstalmentWithPostpay: `{numInstalments} أقساط بدون فوائد {instalmentDelta}  {moneyAmount} مع <a href="https://postpay.io" target="_blank" class="postpay-brand postpay-link">${postpayLogo()} ${informationSvg}</a>`,
  PayInNumber: 'ادفع على {number} دفعات',
  AlmostDone: 'أوشكت على الانتهاء!',
  TextDescForNumInst3:
    'سيتم تقسيم مبلغ مشترياتك على {numInstalments} أقساط عند الانتهاء من عملية الدفع مع بوست باي.',
  TextDescForNumInst1: 'سيتم إنهاء عملية الشراء بمجرد إكمال الدفع مع بوست باي',
  Redirecting: 'سيتم إعادة توجيهك إلي بائع التجزئة',
  PayNowTheRestLaterWithPostpay: `<a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayLogo()} ${informationSvg}</a> ادفع {moneyAmount} الآن والباقي لاحقًا مع بوست باي`,
  InterestFreeInstallment: '{numInstalments} أقساط بدون فوائد',
  PayTodayTheRestIn: 'ادفع {moneyAmount} اليوم والباقي على {numInstalments} أقساط شهرية',
  InterestFreeInstallmentOf: 'تقسيط {moneyAmount} على {numInstalments} أقساط شهرية بدون فوائد',
  BuyNowPayTheRestIn: 'اشتري الآن وادفع بالتقسيط على {numInstalments} أقساط شهرية',
  BuyNowPayIn: 'اشتري الآن وادفع على {numInstalments} أقساط شهرية',
  OrInterestFreePaymentsWithPostpay: `{numInstalments} أقساط شهرية بدون فوائد لمبلغ {moneyAmount} ر.س مع بوست باي <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayBlueLogo()} ${informationSvg}</a>`,
  InterestFreePaymentsWithPostpay: `{numInstalments} أقساط شهرية بدون فوائد بقيمة {moneyAmount}. مع <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayBlueLogo()} ${informationSvg}</a>`,
  OrInterestFreeProductPaymentsWithPostpay: `<div class='postpay-paymet-text-ar'>{numInstalments} أقساط شهرية بدون فوائد لمبلغ {moneyAmount} ر.س مع بوست باي <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${informationSvg}</a></div><a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayBlueLogo()} </a>`,
  InterestFreeProductPaymentsWithPostpay: `<div class='postpay-paymet-text-ar'>{numInstalments} أقساط شهرية بدون فوائد بقيمة {moneyAmount}. مع <a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${informationSvg}</a></div><a href='https://postpay.io' target='_blank' class='postpay-brand postpay-link'>${postpayBlueLogo()}</a>`
};
