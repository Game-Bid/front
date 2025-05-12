"use client";

import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import { useEffect, useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { cn } from "@/_utils/clsx";
import { usePostVerifyCode } from "@/hooks/fetcher/signup/usePostVerifyCode";
import { useVerificationTimer } from "@/_utils/signup/useVerificationTimer";
import { showToast } from "../common/Toast";

interface VerificationSectionProps {
  register: UseFormRegister<SignUpFormData>;
  active: boolean;
  watch: UseFormWatch<SignUpFormData>;
  email: string;
  isResending: boolean;
  onVerifyStateChange: (state: {
    isVerified: boolean;
    timeLeft: number;
  }) => void;
}

const VerificationSection = ({
  register,
  active,
  watch,
  email,
  isResending,
  onVerifyStateChange,
}: VerificationSectionProps) => {
  const code = watch("checkedEmailNumber");
  const [isVerified, setIsVerified] = useState(false);
  const { timeLeft, isTimerExpired, formatTime } = useVerificationTimer({
    active,
    isResending,
    isVerified,
  });
  const isReadOnly = isVerified;
  const disabled = isVerified || isTimerExpired || code?.length !== 6;
  const { mutate: emailVerify, isError } = usePostVerifyCode();

  useEffect(() => {
    onVerifyStateChange({ isVerified, timeLeft });
  }, [isVerified, timeLeft, onVerifyStateChange]);

  useEffect(() => {
    if (timeLeft === 0 && isTimerExpired)
      showToast(
        "warning",
        "인증시간이 초과했습니다.",
        "이메일 인증을 다시 진행해주세요."
      );
  }, [timeLeft, isTimerExpired]);

  const handleVerifyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (code?.length !== 6 || isTimerExpired) return;

    emailVerify(
      { email, code },
      {
        onSuccess: () => {
          setIsVerified(true);
        },
        onError: () => {
          setIsVerified(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex gap-[8px] items-center">
        <label htmlFor="verify-code">인증번호</label>
        {active && timeLeft > 0 && !isVerified && (
          <p className="text-0.875 leading-[1.4em] tracking-[-0.02em] text-systemFailed">
            {formatTime(timeLeft)}
          </p>
        )}
        {isTimerExpired && (
          <p className="text-0.875 leading-[1.4em] tracking-[-0.02em] text-systemFailed">
            인증 시간이 만료되었습니다
          </p>
        )}
      </div>
      <div className="flex gap-[8px]">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          {...register("checkedEmailNumber", {
            required: true,
            validate: (value) => /^\d{6}$/.test(value),
          })}
          readOnly={isReadOnly || isTimerExpired}
          placeholder="인증번호를 입력해주세요."
          className={cn(
            "h-[48px] px-3 w-full rounded-[12px]",
            isReadOnly || isTimerExpired
              ? "bg-fillGrayDisabled text-fgGrayDisabled cursor-not-allowed"
              : "bg-fillGrayDefault focus:border focus:border-borderPrimary"
          )}
        />
        <button
          type="button"
          onClick={handleVerifyClick}
          disabled={disabled && !isError}
          className={cn(
            "h-[48px] px-3 rounded-[12px] whitespace-nowrap",
            disabled
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
