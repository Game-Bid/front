import { cn } from "@/_utils/clsx";
import React from "react";
import CustomIcon from "@/Icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isArrowButton?: boolean;
  arrowDirection?: "left" | "right";
  title: string;
  width?: string;
}

const Button = ({
  variant = "primary",
  size = "md",
  isArrowButton = false,
  arrowDirection,
  title,
  width,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-lg transition-all text-nowrap";

  const variants = {
    primary: cn(
      isArrowButton
        ? ""
        : "bg-fillPrimaryDefault hover:bg-fillPrimaryHovered focus:bg-fillPrimaryFocused",
      "active:bg-fillPrimaryPressed disabled:bg-fillPrimaryDisabled",
      "text-fgPrimaryDefault disabled:text-fgPrimaryDisabled"
    ),
    secondary: cn(
      isArrowButton
        ? ""
        : "bg-fillGrayDefault hover:bg-fillGrayHovered focus:bg-fillGrayFocused",
      "active:bg-fillGrayPressed disabled:bg-fillGrayDisabled",
      "text-fgGrayDefault disabled:text-fgGrayDisabled"
    ),
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      style={width ? { width } : undefined}
      className={cn(
        baseStyles,
        variants[variant],
        !isArrowButton && sizes[size],
        isArrowButton && "px-4 py-2",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {isArrowButton && arrowDirection === "left" && (
        <CustomIcon icon="LEFT_ARROW" fill="fillGrayDefault" />
      )}
      {title}
      {isArrowButton && arrowDirection === "right" && (
        <CustomIcon icon="RIGHT_ARROW" fill="fillGrayDefault" />
      )}
    </button>
  );
};

export default Button;
