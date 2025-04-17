import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import { useState } from "react";
import {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import TextInput from "../common/input/TextInput";

interface ConfirmPasswordSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
}

const ConfirmPasswordSection = ({
  register,
  watch,
  setValue,
  errors,
}: ConfirmPasswordSectionProps) => {
  const confirmPassword = watch("checkedPassword");
  const [showPassword, setShowPassword] = useState(false);

  const clearField = (field: keyof SignUpFormData) => {
    setValue(field, "", { shouldValidate: true });
  };

  const BUTTON_ICON_STYLES = "w-[24px] h-[24px]";

  const confirmPasswordValidationRules: RegisterOptions<
    SignUpFormData,
    Path<SignUpFormData>
  > = {
    required: "비밀번호를 한 번 더 입력해주세요.",
    validate: (value: unknown) => {
      if (typeof value !== "string")
        return "비밀번호 형식이 올바르지 않습니다.";
      return value === watch("password") || "비밀번호가 일치하지 않습니다.";
    },
  };

  const buttonElements = confirmPassword ? (
    <div className="flex gap-[10px]">
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        <CustomIcon
          icon={showPassword ? "CLOSE_EYE_SVG" : "EYE_SVG"}
          className={BUTTON_ICON_STYLES}
        />
      </button>
      <button type="button" onClick={() => clearField("checkedPassword")}>
        <CustomIcon icon="CLOSE_SVG" className={BUTTON_ICON_STYLES} />
      </button>
    </div>
  ) : null;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="checkPassword" className="text-[18px] text-fgGrayDefault">
        비밀번호 확인
      </label>
      <TextInput<SignUpFormData>
        id="checkPassword"
        name="checkedPassword"
        type={showPassword ? "name" : "password"}
        placeholder="비밀번호를 한 번 더 입력해주세요."
        register={register}
        errors={errors}
        className="h-[48px] px-3 rounded-[12px] bg-fillGrayDefault w-full focus:border focus:border-borderPrimary"
        validationRules={confirmPasswordValidationRules}
        rightElement={buttonElements}
      />
    </div>
  );
};

export default ConfirmPasswordSection;
