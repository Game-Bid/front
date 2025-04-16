import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import { useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface ConfirmPasswordSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
}

const ConfirmPasswordSection = ({
  register,
  watch,
  setValue,
}: ConfirmPasswordSectionProps) => {
  const confirmPassword = watch("checkedPassword");
  const [showPassword, setShowPassword] = useState(false);

  const clearField = (field: keyof SignUpFormData) => {
    setValue(field, "", { shouldValidate: true });
  };

  const BUTTON_ICON_STYLES = "w-[24px] h-[24px]";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="checkPassword" className="text-[18px] text-fgGrayDefault">
        비밀번호 확인
      </label>
      <div className="relative">
        <input
          id="checkPassword"
          type={showPassword ? "text" : "password"}
          {...register("checkedPassword", {
            required: "비밀번호를 한 번 더 입력해주세요.",
            validate: (value) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다.",
          })}
          placeholder="비밀번호를 한 번 더 입력해주세요."
          className="h-[48px] px-3 rounded-[12px] bg-fillGrayDefault w-full focus:border focus:border-borderPrimary"
        />
        {confirmPassword && (
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
            <button type="button" onClick={() => clearField("checkedPassword")}>
              <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPasswordSection;
