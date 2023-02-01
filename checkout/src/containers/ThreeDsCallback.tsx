import { ThreeDsEventName } from '@/constants';
import React, { useEffect } from 'react';

const ThreeDsCallback = () => {
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

export default ThreeDsCallback;
