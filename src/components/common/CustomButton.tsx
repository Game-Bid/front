import React from 'react';
import {cn} from "@/_utils/clsx";


interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary";
    arrowDirection?: "left" | "right";
}


const CustomButton = ({
                          variant = "primary",
                          className,
                          disabled,
                          children,
                          ...props
                      }: CustomButtonProps) => {
    const baseStyles =
        "flex-center transition-all text-nowrap font-semibold border border-transparent text-10 gap-0.25 duration-3 h-[48px] tablet:h-[40px] px-0.75 text-1";

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
            className={cn(baseStyles, variants[variant], className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
export default CustomButton;