import { useEffect, useState, useMemo, useCallback } from "react";

interface VerificationTimerProps {
  active: boolean;
  isResending: boolean;
  isVerified: boolean;
}

interface VerificationTimerReturn {
  timeLeft: number;
  isTimerExpired: boolean;
  formatTime: (seconds: number) => string;
}

export const useVerificationTimer = ({
  active,
  isResending,
  isVerified,
}: VerificationTimerProps): VerificationTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (active) {
      setTimeLeft(300);
    } else {
      setTimeLeft(0);
    }
  }, [active]);

  useEffect(() => {
    if (isResending) {
      setTimeLeft(300);
    }
  }, [isResending]);

  useEffect(() => {
    if (timeLeft <= 0 || isVerified) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isVerified]);

  const formatTime = useCallback((seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }, []);

  const isTimerExpired = useMemo(
    () => timeLeft === 0 && !isVerified && !isResending,
    [timeLeft, isVerified, isResending]
  );

  return useMemo(
    () => ({
      timeLeft,
      isTimerExpired,
      formatTime,
    }),
    [timeLeft, isTimerExpired, formatTime]
  );
};
