import { LOCAL_STORAGE } from '@/constants';
import { useEffect, useState } from 'react';

type TUseTimeCountdownProps = {
  storageKey?: string;
  duration?: number;
  onExpire?: () => void;
};

/**
 * A hook for managing countdown timers with localStorage persistence
 */

export const useTimeCountdown = ({
  storageKey = LOCAL_STORAGE.OTP_EXPIRY,
  duration = 60,
  onExpire,
}: TUseTimeCountdownProps = {}) => {
  const [time, setTime] = useState<number>(0);

  const startTimer = () => {
    const expiryTimestamp = Date.now() + duration * 1000;
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, String(expiryTimestamp));
    }
    setTime(duration);
  };

  const resetTimer = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
    setTime(0);
  };

  const isActive = time > 0;

  /**
   * Format the time for display (MM:SS)
   */
  const formattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    // Initialize timer from localStorage on mount
    const initializeTimer = () => {
      if (typeof window !== 'undefined') {
        const storedExpiry = localStorage.getItem(storageKey);

        if (storedExpiry) {
          const expiryTimestamp = parseInt(storedExpiry, 10);
          const currentTime = Date.now();
          const remainingTime = Math.floor(
            (expiryTimestamp - currentTime) / 1000,
          );

          // Only set the timer if there's still time remaining
          if (remainingTime > 0) {
            setTime(remainingTime);
          } else {
            // Clear expired timer
            localStorage.removeItem(storageKey);
          }
        }
      }
    };

    // Initialize timer on mount
    initializeTimer();

    // Set up the countdown interval
    let timer: NodeJS.Timeout | undefined;
    if (time > 0) {
      timer = setInterval(() => {
        setTime((prev) => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            // Clean up when timer reaches zero
            if (typeof window !== 'undefined') {
              localStorage.removeItem(storageKey);
            }
            clearInterval(timer);
            // Execute onExpire callback if provided
            onExpire?.();
          }
          return newValue;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [time, storageKey, onExpire]);

  return {
    time,
    isActive,
    startTimer,
    resetTimer,
    formattedTime,
  };
};
