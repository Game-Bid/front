"use client";

import { cn } from "@/_utils/clsx";
import CustomIcon from "@/Icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NextFind from "../NextFind";

interface FindPwdFormProps {
  onSuccess: () => void;
}

interface FindPwdFormData {
  name: string;
  email: string;
  phoneNum: string[];
}

const LABEL_STYLES =
  "text-[18px] leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault";
const INPUT_STYLES =
  "w-full h-[48px] px-3 rounded-[10px] bg-fillGrayDefault focus:border focus:border-borderPrimary";
const BUTTON_ICON_STYLES = "w-[24px] h-[24px]";
const CLEAR_BUTTON_STYLES =
  "absolute right-2 top-1/2 transform -translate-y-1/2";
const INPUT_NUMBER_STYLES =
  "h-[48px] px-3 rounded-[10px] bg-fillGrayDefault focus:border focus:border-borderPrimary text-center";

const FindPwdForm = ({ onSuccess }: FindPwdFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FindPwdFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNum: ["", "", ""],
      email: "",
    },
  });

  const [showEmail, setShowEmail] = useState(false);
  const nameValue = watch("name");
  const emailValue = watch("email");
  const phoneNumValues = watch("phoneNum");

  const phoneFields = [
    { id: 0, placeholder: "010", maxLength: 3 },
    { id: 1, placeholder: "0000", maxLength: 4 },
    { id: 2, placeholder: "0000", maxLength: 4 },
  ];

  const onSubmit = () => {
    console.log("비밀번호 찾기 버튼 클릭");

    onSuccess();
  };

  const clearField = (field: "name" | "email") => {
    setValue(field, "", { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이름 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={LABEL_STYLES}>
          이름
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            autoFocus
            {...register("name", {
              required: "이름을 입력해주세요.",
            })}
            className={cn(
              INPUT_STYLES,
              errors.name ? "border-systemFailed" : "border-borderDefault",
              nameValue && "pr-10"
            )}
            placeholder="이름을 입력해주세요."
          />
          {nameValue && (
            <button
              type="button"
              onClick={() => clearField("name")}
              className={CLEAR_BUTTON_STYLES}
            >
              <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
            </button>
          )}
        </div>
      </div>

      {/* 휴대폰 번호 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNum[0]" className={LABEL_STYLES}>
          휴대폰 번호
        </label>
        <div className="flex items-center">
          {phoneFields.map((field, index) => (
            <React.Fragment key={field.id}>
              {index > 0 && <div className="mx-2 text-xl">-</div>}
              <div className="relative flex-1">
                <input
                  id={`phoneNum[${field.id}]`}
                  type="text"
                  inputMode="numeric"
                  {...register(`phoneNum.${field.id}` as const, {
                    required: "휴대폰 번호를 입력해주세요.",
                    maxLength: field.maxLength,
                  })}
                  className={cn(
                    INPUT_NUMBER_STYLES,
                    "w-full",
                    errors.phoneNum?.[field.id]
                      ? "border-systemFailed"
                      : "border-borderDefault",
                    phoneNumValues?.[field.id] && "pr-10"
                  )}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                />
                {phoneNumValues?.[field.id] && (
                  <div className="flex gap-[10px] absolute right-2 top-1/2 transform -translate-y-1/2">
                    <button
                      type="button"
                      onClick={() =>
                        setValue(`phoneNum.${field.id}`, "", {
                          shouldValidate: true,
                        })
                      }
                    >
                      <CustomIcon
                        icon="CLOSE_SVG"
                        className="w-[24px] h-[24px]"
                      />
                    </button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 이메일 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL_STYLES}>
          이메일
        </label>
        <div className="relative">
          <input
            id="email"
            type={showEmail ? "text" : "email"}
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
            <div className="flex gap-[10px] absolute right-2 top-1/2 transform -translate-y-1/2">
              <button type="button" onClick={() => setShowEmail(!showEmail)}>
                <CustomIcon
                  icon={showEmail ? "CLOSE_EYE_SVG" : "EYE_SVG"}
                  className={BUTTON_ICON_STYLES}
                />
              </button>
              <button type="button" onClick={() => clearField("email")}>
                <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 버튼 영역 */}
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
        비밀번호 찾기
      </button>
      <NextFind />
    </form>
  );
};

export default FindPwdForm;
