import { cn } from "@/_utils/clsx";
import React from "react";
import CustomIcon from "@/Icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md";
  arrowDirection?: "left" | "right";
  title: string;
  width?: string;
}

const Button = ({
  variant = "primary",
  size = "md",
  arrowDirection,
  title,
  width,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex-center transition-all text-nowrap font-semibold border border-transparent text-[1rem] gap-1 duration-3";

  const variants = {
    primary: disabled
      ? "rounded-md bg-fillPrimaryDisabled text-fgPrimaryDisabled cursor-not-allowed"
      : "rounded-md bg-fillPrimaryDefault text-fgPrimaryDefault shadow-button-primary-shadow hover:bg-fillPrimaryHovered hover:text-fgPrimaryHovered focus:border-borderFocused focus:bg-fillPrimaryFocused focus:text-fgPrimaryFocused active:bg-fillPrimaryPressed active:text-fgPrimaryPressed ",

    secondary: disabled
      ? "rounded-md text-fgGrayDisabled bg-fillGrayDisabled"
      : "rounded-md bg-fillGrayDefault text-fgGrayDefault hover:bg-fillGrayHovered hover:text-fgPrimaryHovered focus:bg-fillGrayFocused focus:border-borderFocused focus:text-fgPrimaryFocused active:bg-fillGrayPressed active:text-fgPrimaryPressed ",

    tertiary: cn(
      disabled
        ? "rounded-sm"
        : "rounded-sm bg-transparent text-fgGrayDefault hover:bg-fillGrayHovered hover:text-fgPrimaryHovered active:bg-fillGrayFocused active:text-fgPrimaryPressed"
    ),
  };

  const sizes = {
    sm: "px-8 h-[40px]",
    md: "px-12 h-[48px]",
  };

  return (
    <button
      style={width ? { width } : undefined}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {arrowDirection === "left" && (
        <CustomIcon icon="LEFT_ARROW" className="w-[24px] h-[24px]" />
      )}
      {title}
      {arrowDirection === "right" && (
        <CustomIcon icon="RIGHT_ARROW" className="w-[24px] h-[24px]" />
      )}
    </button>
  );
};

export default Button;
