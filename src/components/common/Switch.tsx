import React from "react";

interface Props {
  on: boolean;
  setOn: (value: boolean) => void;
}

const Switch = ({ on, setOn }: Props) => {
  return (
    <div
      className={`w-[51px] h-[31px] rounded-full relative duration-300 cursor-pointer ${
        on ? "bg-fillPrimaryFocused" : "bg-fillGrayDefault"
      }`}
      onClick={() => setOn(!on)}
    >
      <div
        className={`w-[27px] h-[27px] rounded-full shadow-lg absolute top-1/2 transform -translate-y-1/2 duration-300  ${
          on ? "left-[22px] bg-white" : "left-[3px] bg-fillGrayPressed"
        }`}
      />
    </div>
  );
};

export default Switch;
