import { ThreeDsEventName } from '@/constants/constants';
import { useEffect } from 'react';

const SecureCheckoutCallback = () => {
  useEffect(() => {
    const url = new URL(location.href);
    const success = url.searchParams.get('success');
    if (success === 'true') {
      window.parent.postMessage(
        {
          name: ThreeDsEventName,
          payload: { success: true },
        },
        location.origin
      );
    } else {
      window.parent.postMessage(
        {
          name: ThreeDsEventName,
          payload: { success: false },
        },
        location.origin
      );
    }
  }, []);

  return <div />;
};

export default SecureCheckoutCallback;
