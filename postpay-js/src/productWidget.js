import {
  createHtmlElement,
  roundHalfDown,
  fetchMerchantSettings,
  findMaximumPaymentOption,
  findMinimumPaymentOption,
  getWidgetAttributes,
  mergeConfig,
  sendWidgetLoadedNotification,
  sendInfoModalCloseNotification,
  sendReactNativeEventWhenClickOnPostpayBrand,
} from './helper';
import closeModalSvg from './assets/svgs/close.svg';
import addPersonSvg from './assets/svgs/add-person-blue-circle.svg';
import discountSvg from './assets/svgs/discount-blue-circle.svg';
import postpaySvg from './assets/svgs/postpay-blue-circle.svg';
import { createPriceText } from './priceText';
import i18n from './libs/i18n';
import { getInstalmentDeltaText } from './paymentSummaryTextHelper';

export function infoModal(options) {
  if (!options.amount) return;
  if (!options.currency) return;

  fetchMerchantSettings(
    {
      amount: options.amount,
      currency: options.currency,
      country: options.country,
    },
    window.PostpayJsConfig,
    (error, settings) => {
      if (error) return;
      const paymentOptions = settings.payment_options
        .filter((item) => item.one_checkout === false)
        .filter((option) => option.num_instalments !== 1);

      if (paymentOptions.length === 0) {
        return;
      }

      const paymentOption = findMaximumPaymentOption(paymentOptions);

      let instalmentPrice = 0;
      let downPaymentAmount = 0;
      let isDynamicDownPayment = false;

      if (paymentOption.dynamic_downpayment !== null)
        isDynamicDownPayment = true;

      let numInstalments = paymentOption.num_instalments;

      if (paymentOption.dynamic_downpayment !== null) {
        const parsedDynamicDownpayment =
          paymentOption.dynamic_downpayment / 100;
        downPaymentAmount = (options.amount * parsedDynamicDownpayment) / 100;
        instalmentPrice =
          (options.amount - downPaymentAmount) / (numInstalments - 1);
      } else {
        downPaymentAmount = roundHalfDown(options.amount / numInstalments);
        instalmentPrice = downPaymentAmount;
      }

      createLearnMoreModal({
        numInstalments: paymentOption.num_instalments,
        instalmentDelta: paymentOption.interval,
        locale: options.locale || PostpayJsConfig.locale,
        currency: options.currency,
        maxAmount: settings.max_amount,
        closeButton: options.hasOwnProperty('closeButton')
          ? options.closeButton
          : true,
        infoModalContainer: options.container || 'body',
        downPaymentAmount,
        isDynamicDownPayment,
      });

      sendWidgetLoadedNotification();
    }
  );
}

export function createProductWidget(
  element,
  settings,
  belongsToPaymentSummary,
  fromSummary
) {
  const {
    amount,
    currency,
    country,
    merchantId,
    theme,
    sandbox,
    defaultNumInstalments,
    widgetUrl,
    textDefault,
    type,
    locale,
  } = getWidgetAttributes(element);

  let numInstalments = defaultNumInstalments;

  const config = mergeConfig({
    merchantId,
    theme,
    sandbox,
    widgetUrl,
    locale,
  });

  if (!currency || !amount || !config.merchantId) return null;

  if (settings) {
    const paymentOption = findMinimumPaymentOption(settings.payment_options);
    let instalmentPrice = 0;
    let downPaymentAmount = 0;
    let isDynamicDownPayment = false;

    numInstalments = defaultNumInstalments
      ? defaultNumInstalments
      : paymentOption.num_instalments;

    if (paymentOption.dynamic_downpayment !== null) isDynamicDownPayment = true;

    numInstalments = defaultNumInstalments
      ? defaultNumInstalments
      : paymentOption.num_instalments;

    if (paymentOption.dynamic_downpayment !== null) {
      const parsedDynamicDownpayment = paymentOption.dynamic_downpayment / 100;
      downPaymentAmount = (amount * parsedDynamicDownpayment) / 100;
      instalmentPrice = (amount - downPaymentAmount) / (numInstalments - 1);
    } else {
      downPaymentAmount = roundHalfDown(amount / numInstalments);
      instalmentPrice = downPaymentAmount;
    }

    const html = createProductWidgetHtml(
      numInstalments,
      paymentOption.interval,
      currency,
      downPaymentAmount,
      config.locale,
      config,
      textDefault,
      belongsToPaymentSummary,
      isDynamicDownPayment,
      theme,
      fromSummary
    );
    element.innerHTML = html;
    sendWidgetLoadedNotification();
    createLearnMoreModal({
      targetElement: element,
      numInstalments,
      instalmentDelta: paymentOption.interval,
      locale: config.locale,
      currency,
      maxAmount: settings.max_amount,
      isDynamicDownPayment,
      downPaymentAmount,
    });
    sendReactNativeEventWhenClickOnPostpayBrand();
  } else {
    fetchMerchantSettings(
      {
        amount,
        currency,
        country,
        defaultNumInstalments,
        event: type,
      },
      config,
      (error, settings) => {
        if (error) {
          element.innerHTML = '';
          return;
        }
        let html = '';
        const paymentOptions = settings.payment_options
          .filter((item) => item.one_checkout === false)
          .filter((option) => option.num_instalments !== 1);

        if (paymentOptions.length === 0) {
          element.innerHTML = '';
          return;
        }
        const paymentOption = findMaximumPaymentOption(paymentOptions);
        let instalmentPrice = 0;
        let downPaymentAmount = 0;
        let isDynamicDownPayment = false;

        if (paymentOption.dynamic_downpayment !== null)
          isDynamicDownPayment = true;

        numInstalments = defaultNumInstalments
          ? defaultNumInstalments
          : paymentOption.num_instalments;

        if (paymentOption.dynamic_downpayment !== null) {
          const parsedDynamicDownpayment =
            paymentOption.dynamic_downpayment / 100;
          downPaymentAmount = (amount * parsedDynamicDownpayment) / 100;
          instalmentPrice = (amount - downPaymentAmount) / (numInstalments - 1);
        } else {
          downPaymentAmount = roundHalfDown(amount / numInstalments);
          instalmentPrice = downPaymentAmount;
        }

        html = createProductWidgetHtml(
          numInstalments,
          paymentOption.interval,
          currency,
          downPaymentAmount,
          config.locale,
          config,
          textDefault,
          belongsToPaymentSummary,
          isDynamicDownPayment,
          theme,
          fromSummary
        );
        element.innerHTML = html;
        sendWidgetLoadedNotification();
        createLearnMoreModal({
          targetElement: element,
          numInstalments,
          instalmentDelta: paymentOption.interval,
          locale: config.locale,
          currency,
          maxAmount: settings.max_amount,
          isDynamicDownPayment,
          downPaymentAmount,
        });
        sendReactNativeEventWhenClickOnPostpayBrand();
      }
    );
  }
}

export function createProductWidgetHtml(
  numInstalments,
  instalmentDelta,
  currency,
  instalmentPrice,
  locale,
  config,
  textDefault,
  belongsToPaymentSummary,
  isDynamicDownPayment,
  theme,
  fromSummary,
) {
  const t = i18n.getTranslateFunction(locale);
  const translationKey =
    textDefault ==='true' || locale === 'ar'
      ? !fromSummary && theme ? 'InterestFreeProductPaymentsWithPostpay':'InterestFreePaymentsWithPostpay'
      :  !fromSummary && theme ? 'OrInterestFreeProductPaymentsWithPostpay' :"OrInterestFreePaymentsWithPostpay" ;


  if (isDynamicDownPayment) {
    return `
    <div class="postpay-product-widget-container ${!fromSummary && theme? 'custom-postpay-product-widget':''} postpay-locale-${locale} ${
      config.theme
    }">
      <div class="postpay-product-widget-text-bold">
        ${t('PayNowTheRestLaterWithPostpay', {
          moneyAmount: createPriceText(currency, instalmentPrice, locale),
        })}
      </div>
      <div class="postpay-product-widget-caption">
        ${t('InterestFreeInstallment', {
          numInstalments: numInstalments,
        })}
      </div>
    </div>`;
  }
  return `
    <div class="postpay-product-widget-container ${!fromSummary && theme? 'custom-postpay-product-widget' : ''} postpay-locale-${locale} ${
    config.theme
  }">
      <div class="postpay-brand postpay-link postpay-product-widget-text">
        ${t(translationKey, {
          numInstalments,
          instalmentDelta: getInstalmentDeltaText(instalmentDelta, locale),
          moneyAmount: createPriceText(currency, instalmentPrice, locale),
        })}
      </div>
    </div>
  `;
}

export function createLearnMoreModal({
  targetElement,
  numInstalments,
  instalmentDelta,
  locale,
  currency,
  maxAmount,
  infoModalContainer,
  closeButton = true,
  isDynamicDownPayment,
  downPaymentAmount,
}) {
  const t = i18n.getTranslateFunction(locale);

  let learnMoreModalTarget = null;
  if (infoModalContainer) {
    learnMoreModalTarget = document.querySelector(infoModalContainer);
  } else {
    learnMoreModalTarget = document.body;
  }

  const classList = [
    'postpay-learn-more-modal',
    `postpay-learn-more-modal-${numInstalments}`,
    `postpay-locale-${locale}`,
  ];

  if (infoModalContainer && learnMoreModalTarget) {
    classList.push('inline-learn-modal-modal', 'show');
  }

  const learnMoreModal = createHtmlElement('div', classList);
  learnMoreModalTarget.appendChild(learnMoreModal);
  const splitYourPurchaseDescriptionKey =
    currency.toLowerCase() === 'sar'
      ? 'SplitYourPurchaseDescriptionKSA'
      : 'SplitYourPurchaseDescription';
  const termKey =
    currency.toLowerCase() === 'sar' ? 'InfoModalTermKSA' : 'InfoModalTerm';
  const installmentInfo = isDynamicDownPayment
    ? t('PayTodayTheRestIn', {
        moneyAmount: createPriceText(
          currency,
          downPaymentAmount,
          locale,
          false,
          false
        ),
        numInstalments: numInstalments - 1,
      })
    : t('InterestFreeInstallmentOf', {
        moneyAmount: createPriceText(
          currency,
          downPaymentAmount,
          locale,
          false,
          true
        ),
        numInstalments,
      });

  const descriptionItemClassName = `postpay-how-it-works-item-description--${locale}`;
  const imageItemClassName = `postpay-how-it-works-item-image-wrapper-circle--${locale}`;

  learnMoreModal.innerHTML = `
  <div class="postpay-learn-more-modal-content-wrapper">
       <div class="postpay-learn-more-modal-content">
         ${
           closeButton
             ? `<div class="postpay-learn-more-modal-close">${closeModalSvg}</div>`
             : ''
         }
         <div class="postpay-modal-title">${t('postpay')}</div>
        <div class="postpay-modal-description">
          ${installmentInfo}
        </div>
        <div class="postpay-how-it-works-container">
          <div class="postpay-how-it-works-item">
            <div class="postpay-how-it-works-item-image-wrapper-circle ${imageItemClassName}">
              ${addPersonSvg}
            </div>
            <div class="postpay-how-it-works-item-text-wrapper">
              <div class="postpay-how-it-works-item-title">
                ${t('SignUpInSeconds')}
              </div>
              <div class="postpay-how-it-works-item-description ${descriptionItemClassName}">
                ${
                  currency === 'SAR'
                    ? t('SignUpInSecondsDescriptionKSA')
                    : t('SignUpInSecondsDescription', {
                        maxAmount: createPriceText(
                          currency,
                          maxAmount,
                          locale,
                          true
                        ),
                      })
                }
              </div>
            </div>
          </div>

          <div class="postpay-how-it-works-item">
            <div class="postpay-how-it-works-item-image-wrapper-circle ${imageItemClassName}">
              ${postpaySvg}
            </div>
            <div class="postpay-how-it-works-item-text-wrapper">
              <div class="postpay-how-it-works-item-title">
                ${t('SplitYourPurchase', {
                  numInstalments,
                })}
              </div>
              <div class="postpay-how-it-works-item-description ${descriptionItemClassName}">
                ${t(splitYourPurchaseDescriptionKey, {
                  numInstalments,
                  remainingNumInstalments: numInstalments - 1,
                  count: numInstalments - 1,
                  instalmentDelta: getInstalmentDeltaText(
                    instalmentDelta,
                    locale
                  ),
                })}
              </div>
            </div>
          </div>

          <div class="postpay-how-it-works-item">
            <div class="postpay-how-it-works-item-image-wrapper-circle ${imageItemClassName}">
              ${discountSvg}
            </div>
            <div class="postpay-how-it-works-item-text-wrapper">
              <div class="postpay-how-it-works-item-title">
                ${t('NoInterestNoFee')}
              </div>
              <div class="postpay-how-it-works-item-description ${descriptionItemClassName}">
                ${t('NoInterestNoFeeDescription')}
              </div>
            </div>
          </div>
        </div>
        <div class="postpay-learn-more-modal-action">
          ${t('InfoModalAction')}
        </div>
        <div class="postpay-learn-more-modal-footer">
          ${t(termKey)}
          <br />
          ${
            currency.toLowerCase() === 'sar'
              ? t('InfoModalContactKSA')
              : t('InfoModalContact')
          }
        </div>
      </div>
    </div>
  `;

  learnMoreModal.style.display =
    infoModalContainer && learnMoreModalTarget ? 'block' : 'none';

  const learnMoreButtonList =
    targetElement && targetElement.querySelector('.postpay-brand.postpay-link');

  if (learnMoreButtonList) {
    learnMoreButtonList.onclick = () => {
      toggleLearnMoreModal(learnMoreModal);
      return false;
    };
  }

  learnMoreModal.onclick = (e) => {
    const wrapper = learnMoreModal.querySelector(
      '.postpay-learn-more-modal-content-wrapper'
    );
    if (wrapper && wrapper.contains(e.target) === false) {
      toggleLearnMoreModal(learnMoreModal);
    }
  };

  const closeModalButton = learnMoreModal.getElementsByClassName(
    'postpay-learn-more-modal-close'
  );

  if (closeModalButton && closeModalButton[0]) {
    closeModalButton[0].onclick = (e) => {
      e.preventDefault();
      toggleLearnMoreModal(learnMoreModal);
      sendInfoModalCloseNotification();
    };
  }
}

function toggleLearnMoreModal(learnMoreModal) {
  if (!learnMoreModal) return;
  if (learnMoreModal.classList.contains('show')) {
    learnMoreModal.classList.remove('show');
    learnMoreModal.classList.add('hide');
    document.body.classList.remove('postpay-body-modal-open');
    learnMoreModal.style.display = 'none';
  } else {
    learnMoreModal.style.display = 'block';
    learnMoreModal.classList.add('show');
    learnMoreModal.classList.remove('hide');
    document.body.classList.add('postpay-body-modal-open');
  }
}
