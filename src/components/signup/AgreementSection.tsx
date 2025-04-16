"use client";

import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import { useEffect } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface CheckboxItem {
  id: "age14" | "terms" | "privacy";
  label: string;
  required: boolean;
}

interface AgreementSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
}

const checkboxItems: CheckboxItem[] = [
  { id: "age14", label: "만 14세 이상입니다.", required: true },
  { id: "terms", label: "서비스 이용약관에 동의합니다.", required: true },
  { id: "privacy", label: "개인정보 수집/이용에 동의합니다.", required: true },
];

const AgreementSection = ({
  register,
  setValue,
  watch,
}: AgreementSectionProps) => {
  const watchedValues = {
    agreeAll: watch("agreeAll") ?? false,
    age14: watch("age14") ?? false,
    terms: watch("terms") ?? false,
    privacy: watch("privacy") ?? false,
  };

  useEffect(() => {
    const allChecked =
      watchedValues.age14 && watchedValues.terms && watchedValues.privacy;

    if (allChecked !== watchedValues.agreeAll) {
      setValue("agreeAll", allChecked, { shouldValidate: true });
    }
  }, [
    watchedValues.age14,
    watchedValues.terms,
    watchedValues.privacy,
    watchedValues.agreeAll,
    setValue,
  ]);

  const handleCheckboxClick = (
    id: "agreeAll" | "age14" | "terms" | "privacy"
  ) => {
    if (id === "agreeAll") {
      const newAllChecked = !watchedValues.agreeAll;
      setValue("agreeAll", newAllChecked, { shouldValidate: true });
      setValue("age14", newAllChecked, { shouldValidate: true });
      setValue("terms", newAllChecked, { shouldValidate: true });
      setValue("privacy", newAllChecked, { shouldValidate: true });
    } else {
      setValue(id, !watchedValues[id], { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col gap-3 my-[60px]">
      {/* 전체 동의 */}
      <div className="flex items-center gap-2">
        <div
          className="relative w-[24px] h-[24px] rounded-[8px] bg-fillGrayDefault flex items-center justify-center cursor-pointer"
          onClick={() => handleCheckboxClick("agreeAll")}
        >
          {watchedValues.agreeAll && (
            <CustomIcon icon="CHECK_ICON_SVG" className="w-[24px] h-[24px]" />
          )}
          <input
            type="checkbox"
            id="agreeAll"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            {...register("agreeAll", { required: true })}
          />
        </div>
        <span
          className="cursor-pointer"
          onClick={() => handleCheckboxClick("agreeAll")}
        >
          모두 동의합니다.
        </span>
      </div>

      <hr className="border-borderGrayDefault" />

      {/* 개별 체크박스 */}
      <div className="flex flex-col gap-3">
        {checkboxItems.map((item) => (
          <div key={item.id} className="flex gap-3 items-center">
            <div
              className="relative w-[24px] h-[24px] rounded-[8px] bg-fillGrayDefault flex items-center justify-center cursor-pointer"
              onClick={() => handleCheckboxClick(item.id)}
            >
              {watchedValues[item.id] && (
                <CustomIcon
                  icon="CHECK_ICON_SVG"
                  className="w-[24px] h-[24px]"
                />
              )}
              <input
                type="checkbox"
                id={item.id}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                {...register(item.id, { required: item.required })}
              />
            </div>
            <span
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => handleCheckboxClick(item.id)}
            >
              {item.label}
              {item.required && (
                <span className="text-[14px] text-fgPrimaryAccent">(필수)</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgreementSection;
