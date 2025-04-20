import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { ReactNode } from "react";

interface InputProps<T extends FieldValues> {
  id: string;
  name: Path<T>;
  type?: "name" | "email" | "password";
  placeholder?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  validationRules?: RegisterOptions<T, Path<T>>;
  rightElement?: ReactNode;
}

const getValidationRules = <T extends FieldValues>(
  type: InputProps<T>["type"],
  required: boolean,
  customRules?: RegisterOptions<T, Path<T>>
) => {
  if (customRules) {
    return customRules;
  }

  const rules: RegisterOptions<T, Path<T>> = {};

  if (type === "email") {
    rules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "유효한 이메일 형식을 입력해주세요",
    };
  } else if (type === "password") {
    rules.pattern = {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message: "",
    };
  } else if (type === "name") {
    rules.minLength = {
      value: 2,
      message: "최소 2자 이상 입력해주세요",
    };
  }

  return rules;
};

const TextInput = <T extends FieldValues>({
  id,
  name,
  type = "email",
  placeholder,
  register,
  errors,
  className,
  required = false,
  disabled = false,
  autoFocus = false,
  validationRules,
  rightElement,
}: InputProps<T>) => {
  const rules = getValidationRules<T>(type, required, validationRules);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          {...register(name, rules)}
          className={`${className} ${rightElement ? "pr-16" : ""}`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {errors?.[name]?.message && (
        <p className="text-[12px] text-systemFailed">
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default TextInput;
