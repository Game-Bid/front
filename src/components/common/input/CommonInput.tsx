import React from "react";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  warning?: boolean;
  placeholder?: string;
}

const CommonInput = ({
  disabled,
  warning,
  placeholder,
  ...props
}: CommonInputProps) => {
  return (
    <div className="w-full">
      <input
        className={`min-w-[400px] w-full h-[48px] px-[12px] pr-[40px] border rounded-md text-[16px] duration-100  ${
          disabled
            ? ""
            : warning
            ? ""
            : "border-transparent bg-fillGrayDefault text-fgGrayDefault hover:placeholder:bg-fillGrayHovered hover:text-fgGrayHovered hover:bg-fillGrayHovered placeholder:text-fgGrayPlaceholder focus:bg-fillGrayFocused focus:border-borderPrimary "
        }`}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CommonInput;
