import { Throttle } from '@/graphql';
import { useEffect, useRef, useState } from 'react';
import { Maybe } from 'types/custom';

export default function useThrottleTimer() {
  const resetTimer = useRef<Maybe<number>>();
  const [retryAfter, setRetryAfter] = useState(-1);

  useEffect(() => {
    if (resetTimer.current) {
      clearInterval(resetTimer.current);
    }
  }, []);

  function initThrottleTimer(throttle: Throttle) {
    let initialRetryAfter =
      throttle!.reset! - Math.floor(new Date().getTime() / 1000);
    setRetryAfter(initialRetryAfter);
    resetTimer.current = setInterval(() => {
      if (retryAfter === 0) {
        setRetryAfter(-1);
        if (resetTimer.current) {
          return clearInterval(resetTimer.current);
        }
      }
      setRetryAfter(initialRetryAfter--);
    }, 1000);
  }

  return {
    retryAfter,
    initThrottleTimer,
  };
}
