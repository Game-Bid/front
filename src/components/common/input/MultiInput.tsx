import React, { useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";

type MultiInputFieldName =
  | "phoneNum.first"
  | "phoneNum.middle"
  | "phoneNum.last"
  | "birth.year"
  | "birth.month"
  | "birth.day";

interface InputConfig {
  placeholder: string;
  maxLength: number;
  name: MultiInputFieldName;
}

interface MultiInputProps {
  label: string;
  name: string;
  inputConfigs: readonly InputConfig[];
  register: UseFormRegister<SignUpFormData>;
  showDash?: boolean;
  gapBetweenInputs?: string;
}

const MultiInput = React.forwardRef<HTMLInputElement, MultiInputProps>(
  (
    {
      label,
      name,
      inputConfigs,
      register,
      showDash = false,
      gapBetweenInputs = "gap-3",
    }: MultiInputProps,
    ref
  ) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange =
      (index: number) => (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;

        if (
          input.value.length === input.maxLength &&
          index < inputRefs.current.length - 1
        ) {
          const nextInput = inputRefs.current[index + 1];
          if (nextInput) {
            setTimeout(() => {
              nextInput.focus();
            }, 0);
          }
        }
      };

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-[18px] text-fgGrayDefault">
          {label}
        </label>
        <div className={`flex ${gapBetweenInputs} items-center`}>
          {inputConfigs.map(({ placeholder, maxLength, name }, index) => {
            const { ref: hookFormRef, ...restRegister } = register(name, {
              required: "필수 입력 항목입니다.",
              minLength: {
                value: maxLength === 4 ? 4 : maxLength,
                message: `${maxLength}자리를 모두 입력해주세요.`,
              },
              maxLength: {
                value: maxLength,
                message: `최대 ${maxLength}자리까지 입력 가능합니다.`,
              },
              pattern: {
                value: /^\d+$/,
                message: "숫자만 입력 가능합니다.",
              },
            });

            return (
              <React.Fragment key={name}>
                <input
                  id={name}
                  type="text"
                  className="w-1/3 h-[48px] px-3 text-center rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
                  placeholder={placeholder}
                  maxLength={maxLength}
                  inputMode="numeric"
                  pattern="\d*"
                  ref={(el) => {
                    hookFormRef(el);
                    inputRefs.current[index] = el;
                    if (index === 0 && ref) {
                      if (typeof ref === "function") {
                        ref(el);
                      } else {
                        ref.current = el;
                      }
                    }
                  }}
                  {...restRegister}
                  onChange={(e) => {
                    restRegister.onChange(e);
                  }}
                  onInput={handleInputChange(index)}
                />
                {showDash && index < inputConfigs.length - 1 && <p>-</p>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
);

MultiInput.displayName = "MultiInput";
export default React.memo(MultiInput);
