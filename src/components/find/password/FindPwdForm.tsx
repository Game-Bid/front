"use client";

import { cn } from "@/_utils/clsx";
import CustomIcon from "@/Icons";
import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import NextFind from "../NextFind";
import MultiInput from "@/components/common/input/MultiInput";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import TextInput from "@/components/common/input/TextInput";

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

const FindPwdForm = ({ onSuccess }: FindPwdFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
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

  const nameValue = watch("name");
  const emailValue = watch("email");

  const onSubmit = () => {
    console.log("비밀번호 찾기 버튼 클릭");
    onSuccess();
  };

  const clearField = (field: "name" | "email") => {
    setValue(field, "", { shouldValidate: true });
  };

  const phoneInputs = [
    { placeholder: "010", maxLength: 3, name: "phoneNum.first" },
    { placeholder: "1234", maxLength: 4, name: "phoneNum.middle" },
    { placeholder: "5678", maxLength: 4, name: "phoneNum.last" },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 이름 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={LABEL_STYLES}>
          이름
        </label>
        <TextInput<SignUpFormData>
          id="name"
          name="name"
          type="name"
          placeholder="이름을 입력해주세요."
          register={register as unknown as UseFormRegister<SignUpFormData>}
          className="w-full h-[48px] px-3 rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
          required={true}
          rightElement={
            nameValue && (
              <button type="button" onClick={() => clearField("name")}>
                <CustomIcon icon="CLOSE_SVG" className="w-[24px] h-[24px]" />
              </button>
            )
          }
        />
      </div>

      {/* 휴대폰 번호 입력 필드 */}
      <MultiInput
        label="휴대폰 번호"
        name="phoneNum"
        inputConfigs={phoneInputs}
        register={register as unknown as UseFormRegister<SignUpFormData>}
        showDash={true}
      />

      {/* 이메일 입력 필드 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL_STYLES}>
          이메일
        </label>
        <TextInput<SignUpFormData>
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          register={register as unknown as UseFormRegister<SignUpFormData>}
          className="w-full h-[48px] px-3 rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
          required={true}
          rightElement={
            emailValue && (
              <button type="button" onClick={() => clearField("email")}>
                <CustomIcon icon="CLOSE_SVG" className="w-[24px] h-[24px]" />
              </button>
            )
          }
        />
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
