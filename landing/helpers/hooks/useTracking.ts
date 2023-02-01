import Analytics from "analytics";
import segmentPlugin from "@analytics/segment";

const userId = "vuhFQhk7tCH3YnATr9ML8cHahx2ZdDL7";

export const TRACKING_EVENTS = {
  MerchantClick: "MerchantClick",
};

const analytics = Analytics({
  app: "postpay-landing",
  plugins: [
    segmentPlugin({
      writeKey: userId,
    }),
  ],
});

export default function useTracking() {
  const _track = (eventName: string, data: Object = {}) => {
    analytics.track(eventName, {
      ...data,
    });
  };

  const trackMerchantClick = (name: string) => {
    _track(TRACKING_EVENTS.MerchantClick, { name });
    analytics.identify(userId, {
      name,
    });
  };

  return {
    trackMerchantClick,
  };
}
