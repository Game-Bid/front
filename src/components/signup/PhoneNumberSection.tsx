import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import React from "react";
import { UseFormRegister } from "react-hook-form";

const PhoneNumberSection = ({
  register,
}: {
  register: UseFormRegister<SignUpFormData>;
}) => {
  const inputProps = [
    { placeholder: "010", maxLength: 3, name: "phoneNum.first" },
    { placeholder: "1234", maxLength: 4, name: "phoneNum.middle" },
    { placeholder: "5678", maxLength: 4, name: "phoneNum.last" },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="phoneNum" className="text-[18px] text-fgGrayDefault">
        휴대폰 번호
      </label>
      <div className="flex gap-3 items-center">
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
            {index < inputProps.length - 1 && <p>-</p>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PhoneNumberSection;
