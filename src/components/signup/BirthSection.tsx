import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import React from "react";
import { UseFormRegister } from "react-hook-form";

const BirthSection = ({
  register,
}: {
  register: UseFormRegister<SignUpFormData>;
}) => {
  const inputProps = [
    { placeholder: "YYYY", maxLength: 4, name: "birth.year" },
    { placeholder: "MM", maxLength: 2, name: "birth.month" },
    { placeholder: "DD", maxLength: 2, name: "birth.day" },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="birth" className="text-[18px] text-fgGrayDefault">
        생년월일
      </label>
      <div className="flex gap-[31px] items-center">
        {inputProps.map(({ placeholder, maxLength, name }, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              className="w-1/3 h-[48px] px-3 text-center rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
              placeholder={placeholder}
              maxLength={maxLength}
              inputMode="numeric"
              pattern="\d*"
              {...register(name, { required: true })}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BirthSection;
