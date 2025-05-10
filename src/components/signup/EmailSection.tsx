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
  const [isResending, setIsResending] = useState(false);
  const [isInputLocked, setIsInputLocked] = useState(false);

  const { mutate: sendEmailVerification } = usePostVerifyRequest();

  const handleSendVerification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidEmail) return;

    setIsResending(true);
    sendEmailVerification(email, {
      onSuccess: () => {
        setActiveVerification(true);
        setIsResending(false);
      },
      onError: () => {
        setIsResending(false);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <label htmlFor="email" className="text-1.125 text-fgGrayDefault">
          이메일
        </label>
        <div className="flex gap-[8px] justify-between w-full">
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
              "h-[48px] min-w-[283px] w-full px-0.75 rounded-md focus:border focus:border-borderPrimary",
              isInputLocked
                ? "bg-fillGrayDisabled text-fgGrayDisabled cursor-not-allowed"
                : "bg-fillGrayDefault focus:border focus:border-borderPrimary"
            )}
          />
          <button
            type="button"
            onClick={handleSendVerification}
            disabled={!isValidEmail || isInputLocked || isResending}
            className={cn(
              "w-[123px] h-[48px] rounded-md whitespace-nowrap",
              !isValidEmail || isInputLocked || isResending
                ? "bg-fillGrayDisabled text-fgGrayDisabled"
                : "bg-fillGrayDefault text-fgGrayDefault"
            )}
          >
            {activeVerification ? "인증번호 재전송" : "인증번호 전송"}
          </button>
        </div>
      </div>
      {activeVerification && (
        <VerificationSection
          active={activeVerification}
          isResending={isResending}
          watch={watch}
          email={email}
          register={register}
          onVerifyStateChange={({ isVerified }) => {
            setIsInputLocked(isVerified);
          }}
        />
      )}
    </>
  );
};

export default EmailSection;
