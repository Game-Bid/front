import { cn } from "@/_utils/clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  icon?: "left" | "right";
  title: string;
  width?: string;
  customIcon?: React.ReactNode;
}

const Button = ({
  variant = "primary",
  // size = "md",
  icon,
  title,
  width,
  className,
  disabled,
  customIcon,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex-center transition-all text-nowrap font-semibold border border-transparent gap-0.25 duration-3 h-[48px] tablet:h-[40px] px-0.75 ";

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

  return (
    <button
      style={width ? { width } : undefined}
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon === "left" && customIcon}
      <p className="text-1">{title}</p>
      {icon === "right" && customIcon}
    </button>
  );
};

export default Button;
