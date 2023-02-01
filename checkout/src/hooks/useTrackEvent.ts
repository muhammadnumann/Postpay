declare const window: Window &
  typeof globalThis & {
    gtag: any;
  };

const useTrackEvent = () => {
  const gtag = window.gtag || (() => {});
  const trackEvent = (eventName: string) => {
    gtag('event', eventName, { event_category: 'checkout' });
  };
  return trackEvent;
};

export default useTrackEvent;
