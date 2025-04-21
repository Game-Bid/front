"use client";

import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { cn } from "@/_utils/clsx";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import VerificationSection from "./VerificationSection";
import { useState } from "react";
import TextInput from "../common/input/TextInput";
import { usePostVerifyRequest } from "@/hooks/fetcher/signup/usePostVerifyRequest";

interface EmailSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
}

const EmailSection = ({ register, watch, errors }: EmailSectionProps) => {
  const email = watch("email");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  const [activeVerification, setActiveVerification] = useState(false);
  const [isResent, setIsResent] = useState(false);
  const [isInputLocked, setIsInputLocked] = useState(false);
  const [verificationKey, setVerificationKey] = useState(0);

  const { mutate: sendEmailVerification } = usePostVerifyRequest();

  const handleSendVerification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidEmail) return;
    sendEmailVerification(email, {});
    setActiveVerification(true);
    setIsResent(true);

    setVerificationKey((prev) => prev + 1);
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
            onClick={handleSendVerification}
            disabled={!isValidEmail || (isInputLocked && activeVerification)}
            className={cn(
              "w-[123px] h-[48px] px-3 rounded-[12px] whitespace-nowrap",
              !isValidEmail || (isInputLocked && activeVerification)
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
          key={verificationKey}
          active={activeVerification}
          watch={watch}
          email={email}
          register={register}
          onVerifyStateChange={({ isVerified, timeLeft }) => {
            setIsInputLocked(isVerified);
          }}
        />
      )}
    </>
  );
};

export default EmailSection;
