import { injectScript } from './helper';
import oneLogo from './assets/svgs/one-logo.svg';

export function createOneButtonWidget(element) {
  const html = `
  <div id="buyinone" class="postpay-one-button-container">
    <button class="postpay-one-button-button">
      <div class="postpay-one-button-background"></div>
      <span class="postpay-one-button-text">Buy with</span> ${oneLogo}
    </button>
  </div>
  `;
  element.innerHTML = html;
  injectScript(process.env.POSTPAY_CDN + '/lottie.min.js', function onLottieLoaded() {
    lottie.loadAnimation({
      container: document.getElementsByClassName('postpay-one-button-background')[0],
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: process.env.POSTPAY_CDN + '/one-button-animation.json'
    });
  });
}

