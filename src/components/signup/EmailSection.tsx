"use client";

import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { cn } from "@/_utils/clsx";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import VerificationSection from "./VerificationSection";
import { useState } from "react";
import TextInput from "../common/input/TextInput";

interface EmailSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
}

const EmailSection = ({ register, watch, errors }: EmailSectionProps) => {
  const email = watch("email");
  const emailNumber = watch("checkedEmailNumber");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  const [activeVerification, setActiveVerification] = useState(false);
  const [isResent, setIsResent] = useState(false);
  const [isInputLocked, setIsInputLocked] = useState(false);

  const handleVerificationSection = () => {
    if (!isValidEmail) return;
    setActiveVerification(true);
    setIsResent(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[18px] text-fgGrayDefault">
          이메일
        </label>
        <div className="flex gap-2">
          <TextInput
            id="email"
            name="email"
            type="email"
            autoFocus
            disabled={isInputLocked}
            placeholder="이메일을 입력해주세요."
            register={register}
            errors={errors}
            required
            className={cn(
              "w-[269px] h-[48px] px-3 rounded-[12px] focus:border focus:border-borderPrimary",
              isInputLocked
                ? "bg-fillGrayDisabled text-fgGrayDisabled cursor-not-allowed"
                : "bg-fillGrayDefault text-fgGrayFocused"
            )}
          />
          <button
            type="button"
            onClick={handleVerificationSection}
            disabled={!isValidEmail || isInputLocked}
            className={cn(
              "w-[123px] h-[48px] px-3 rounded-[12px] whitespace-nowrap",
              !isValidEmail || isInputLocked
                ? "bg-fillGrayDisabled text-fgGrayDisabled"
                : "bg-fillGrayDefault text-fgGrayDefault"
            )}
          >
            {isResent ? "인증번호 재전송" : "인증번호 전송"}
          </button>
        </div>
      </div>
      {activeVerification && (
        <VerificationSection
          active={activeVerification}
          watch={emailNumber}
          register={register}
          onVerifyStateChange={({ isVerified, timeLeft }) => {
            setIsInputLocked(isVerified || timeLeft === 0);
          }}
        />
      )}
    </>
  );
};

export default EmailSection;
