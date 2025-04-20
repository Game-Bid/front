import { cn } from "@/_utils/clsx";
import React from "react";

type ButtonType = "button" | "submit" | "reset";

interface LoginButtonProps {
  isType: ButtonType;
  isDisabled: boolean;
  isClassName: string;
  isText: string;
}

const LoginButton = ({
  isType,
  isDisabled,
  isClassName,
  isText,
}: LoginButtonProps) => {
  return (
    <button
      type={isType}
      disabled={isDisabled}
      className={cn(
        "w-full h-[48px] px-3 rounded-[10px] font-semibold transition-colors duration-200",
        isClassName
      )}
    >
      {isText}
    </button>
  );
};

export default LoginButton;
