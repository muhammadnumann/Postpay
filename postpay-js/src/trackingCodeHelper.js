export function getTrackingCookieValue() {
  const paCookie = getCookie('_pa');
  if (paCookie) {
    return paCookie.substr(4);
  }
  return generateTrackingCode();
}

function generateTrackingCode() {
  const cookie =
    Math.random().toString().slice(2,12) +
    '.'
    +
    Math.floor(Date.now() / 1000).toString();
  return cookie;
}

export function createTrackingCookie() {
  if (document.cookie.indexOf('_pa=') === -1) {
    const date = new Date()
    date.setFullYear(new Date().getFullYear() + 2);
    const dateString = date.toUTCString();
    const cookieString = '_pa=' + 'PA1.' + getTrackingCookieValue() +
      ';expires=' + dateString +
      ';path=/;domain=.' + location.host;   
    document.cookie = cookieString;
  }
}

function getCookie(name) {
  function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}
