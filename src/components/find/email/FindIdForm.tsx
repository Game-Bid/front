"use client";

import { cn } from "@/_utils/clsx";
import CustomIcon from "@/Icons";
import React from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import NextFind from "../NextFind";
import MultiInput from "@/components/common/input/MultiInput";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import TextInput from "@/components/common/input/TextInput";
import LoginButton from "@/components/login/LoginButton";

interface FindIdFormData {
  name: string;
  phoneNum: string[];
}

interface FindIdFormProps {
  onSuccess: (data: { email: string; joined: string }) => void;
}

const FindIdForm = ({ onSuccess }: FindIdFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
    getValues,
  } = useForm<FindIdFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNum: ["", "", ""],
    },
  });

  const name = watch("name");

  const onSubmit = (data: FindIdFormData) => {
    console.log("Input:", data);

    onSuccess({
      email: "dongsu@gamebid",
      joined: "2025.03.19 가입",
    });
  };

  const clearField = (field: "name" | number) => {
    if (field === "name") {
      setValue("name", "", { shouldValidate: true });
    } else {
      const newPhoneNum = [...getValues("phoneNum")];
      newPhoneNum[field] = "";
      setValue("phoneNum", newPhoneNum, { shouldValidate: true });
    }
  };

  const phoneInputs = [
    { placeholder: "010", maxLength: 3, name: "phoneNum.first" },
    { placeholder: "1234", maxLength: 4, name: "phoneNum.middle" },
    { placeholder: "5678", maxLength: 4, name: "phoneNum.last" },
  ] as const;

  const LABEL_STYLES =
    "text-[18px] leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault";

  return (
    <>
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
            autoFocus={true}
            register={register as unknown as UseFormRegister<SignUpFormData>}
            className="w-full h-[48px] px-3 rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
            required={true}
            rightElement={
              name && (
                <button type="button" onClick={() => clearField("name")}>
                  <CustomIcon icon="CLOSE_SVG" className="w-[24px] h-[24px]" />
                </button>
              )
            }
          />
        </div>

        {/* 휴대폰 번호 입력 필드 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <MultiInput
              label="휴대폰 번호"
              name="phoneNum"
              inputConfigs={phoneInputs}
              register={register as unknown as UseFormRegister<SignUpFormData>}
              showDash={true}
            />
          </div>
        </div>

        {/* 찾기 버튼 */}
        <LoginButton
          isType="submit"
          isDisabled={!isValid}
          isClassName={cn(
            isValid
              ? "bg-fillPrimaryDefault text-white"
              : "bg-fillPrimaryDisabled text-fgPrimaryDisabled cursor-not-allowed"
          )}
          isText="이메일 찾기"
        />
      </form>
      <NextFind />
    </>
  );
};

export default FindIdForm;
