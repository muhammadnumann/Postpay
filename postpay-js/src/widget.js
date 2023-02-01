import { createProductWidget } from './productWidget';
import { createPaymentSummaryWidget } from './paymentSummaryWidget';
import { createOneButtonWidget } from './oneWidget';

export function scanForWidgets(selector) {
  let widgets = [];
  if (selector) {
    widgets = document.querySelectorAll(selector);
  } else {
    widgets = document.getElementsByClassName('postpay-widget');
  }

  for (let element of widgets) {
    if (!element) return;
    const type = element.getAttribute('data-type');
    if (type === 'product' || type === 'cart') {
      createProductWidget(element);
    } else if (type === 'instalment-plan' || type === 'payment-summary') {
      createPaymentSummaryWidget(element);
    } else if (type === 'one-button') {
      createOneButtonWidget(element);
    }
  }
}
