"use client";

import { cn } from "@/_utils/clsx";
import CustomIcon from "@/Icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const LABEL_STYLES =
  "text-[18px] leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault";
const INPUT_STYLES =
  "w-full h-[48px] px-3 rounded-[10px] bg-fillGrayDefault focus:border focus:border-borderPrimary";
const BUTTON_ICON_STYLES = "w-[24px] h-[24px]";
const CLEAR_BUTTON_STYLES =
  "absolute right-2 top-1/2 transform -translate-y-1/2";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = (data: LoginFormData) => {
    console.log("Login:", data);
  };

  const clearField = (field: keyof LoginFormData) => {
    setValue(field, "", { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이메일 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL_STYLES}>
          이메일
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            autoFocus
            {...register("email", {
              required: "이메일을 입력해주세요.",
            })}
            className={cn(
              INPUT_STYLES,
              errors.email ? "border-systemFailed" : "border-borderDefault",
              emailValue && "pr-10"
            )}
            placeholder="이메일을 입력해주세요."
          />
          {emailValue && (
            <button
              type="button"
              onClick={() => clearField("email")}
              className={CLEAR_BUTTON_STYLES}
            >
              <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
            </button>
          )}
        </div>
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className={LABEL_STYLES}>
          비밀번호
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            className={cn(
              INPUT_STYLES,
              errors.password ? "border-systemFailed" : "border-borderDefault",
              passwordValue && "pr-10"
            )}
            placeholder="비밀번호를 입력해주세요."
          />
          {passwordValue && (
            <div className="flex gap-[10px] absolute right-2 top-1/2 transform -translate-y-1/2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <CustomIcon
                  icon={showPassword ? "CLOSE_EYE_SVG" : "EYE_SVG"}
                  className={BUTTON_ICON_STYLES}
                />
              </button>
              <button type="button" onClick={() => clearField("password")}>
                <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={!isValid}
        className={cn(
          "w-full h-[48px] px-3 rounded-[10px] font-semibold transition-colors duration-200",
          isValid
            ? "bg-fillPrimaryDefault text-white"
            : "bg-fillPrimaryDisabled text-fgPrimaryDisabled cursor-not-allowed"
        )}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
