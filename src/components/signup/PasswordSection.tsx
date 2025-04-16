"use client";

import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import { useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ConfirmPasswordSection from "./ConfirmPasswordSection";

interface PasswordSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
}

const PasswordSection = ({
  register,
  watch,
  setValue,
}: PasswordSectionProps) => {
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);

  const clearField = (field: keyof SignUpFormData) => {
    setValue(field, "", { shouldValidate: true });
  };

  const BUTTON_ICON_STYLES = "w-[24px] h-[24px]";

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[18px] text-fgGrayDefault">
          비밀번호
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.",
              },
            })}
            placeholder="비밀번호를 입력해주세요."
            className="h-[48px] px-3 rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary w-full"
          />
          {password && (
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
        <p className="text-[12px] text-fgGrayPlaceholder">
          영문, 숫자, 특수문자를 조합하여 길이를 최소 8~10자리 이상
        </p>
      </div>
      <ConfirmPasswordSection
        register={register}
        watch={watch}
        setValue={setValue}
      />
    </>
  );
};

export default PasswordSection;
