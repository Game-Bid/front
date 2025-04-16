"use client";

import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { cn } from "@/_utils/clsx";

interface VerificationSectionProps {
  register: UseFormRegister<SignUpFormData>;
  active: boolean;
  watch?: string;
  onVerifyStateChange: (state: {
    isVerified: boolean;
    timeLeft: number;
  }) => void;
}

const VerificationSection = ({
  register,
  active,
  watch,
  onVerifyStateChange,
}: VerificationSectionProps) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const isReadOnly = isVerified || timeLeft === 0;
  const disabled = isVerified || timeLeft === 0 || watch?.length !== 6;

  useEffect(() => {
    if (active) {
      setTimeLeft(300);
    }
  }, [active]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    onVerifyStateChange({ isVerified, timeLeft });
  }, [isVerified, timeLeft, onVerifyStateChange]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleVerifyClick = () => {
    if (watch?.length !== 6) return;
    setIsVerified(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="verify-code">인증번호</label>
        {active && timeLeft > 0 && (
          <p className="text-[14px] leading-[1.4em] tracking-[-0.02em] text-systemFailed">
            남은 시간: {formatTime(timeLeft)}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          {...register("checkedEmailNumber", {
            required: true,
            validate: (value) => /^\d{6}$/.test(value),
          })}
          readOnly={isReadOnly}
          placeholder="인증번호를 입력해주세요."
          className={cn(
            "h-[48px] px-3 w-full rounded-[12px]",
            isReadOnly
              ? "bg-fillGrayDisabled text-fgGrayDisabled cursor-not-allowed"
              : "bg-fillGrayDefault focus:border focus:border-borderPrimary"
          )}
        />
        <button
          type="button"
          onClick={handleVerifyClick}
          disabled={disabled}
          className={cn(
            "h-[48px] px-3 rounded-[12px] whitespace-nowrap",
            !watch || disabled
              ? "bg-fillGrayDisabled text-fgGrayDisabled"
              : "bg-fillGrayDefault text-fgGrayDefault"
          )}
        >
          인증하기
        </button>
      </div>
    </div>
  );
};

export default VerificationSection;
