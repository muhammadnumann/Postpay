export function sendCloseModalMessage() {
  if (window.parent) {
    window.parent.postMessage(
      {
        message: 'postpayCloseModal',
      },
      '*'
    );
  }
}

export function sendCheckoutCompleteMessage(
  redirectUrl: string = '',
  status: string = ''
) {
  if (window.parent) {
    window.parent.postMessage(
      {
        message: 'postpayCheckoutComplete',
        redirectUrl,
        status,
      },
      '*'
    );
  }
}
