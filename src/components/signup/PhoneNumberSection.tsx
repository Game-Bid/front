import React from "react";
import { UseFormRegister } from "react-hook-form";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import MultiInput from "../common/input/MultiInput";

interface PhoneNumberSectionProps {
  register: UseFormRegister<SignUpFormData>;
}

const PhoneNumberSection = ({ register }: PhoneNumberSectionProps) => {
  const phoneInputs = [
    { placeholder: "010", maxLength: 3, name: "phoneNum.first" },
    { placeholder: "1234", maxLength: 4, name: "phoneNum.middle" },
    { placeholder: "5678", maxLength: 4, name: "phoneNum.last" },
  ] as const;

  return (
    <MultiInput
      label="휴대폰 번호"
      name="phoneNum"
      inputConfigs={phoneInputs}
      register={register}
      showDash={true}
    />
  );
};

export default PhoneNumberSection;
