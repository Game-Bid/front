import React from "react";

interface CommonInputProps {
  disabled?: boolean;
  warning?: boolean;
}

const CommonInput = ({ disabled, warning, ...props }: CommonInputProps) => {
  return <input className={``} {...props} />;
};

export default CommonInput;
