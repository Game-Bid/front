import React, { useState } from "react";

const WriteFormContent = ({
  title,
  description,
  setTitle,
  setDescription,
}: {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`px-[16px] py-[24px] w-full bg-fillGrayDefault flex flex-col gap-[20px] rounded-lg transition-all ${
        isFocused && "border border-fgPrimaryAccent"
      }`}
    >
      <input
        type="text"
        className="bg-transparent text-fgGrayFocused font-semibold text-[20px] placeholder:text-fgGrayPlaceholder leading-[1.4] tracking-[-0.4px]"
        placeholder="제목을 입력하세요."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.querySelector(":focus")) {
            setIsFocused(false);
          }
        }}
      />
      <div className="w-full h-[1px] bg-borderDefault"></div>
      <textarea
        name=""
        id=""
        className="bg-transparent resize-none min-h-[400px] text-[16px] text-fgGrayFocused placeholder:text-fgGrayPlaceholder leading-[1.4] tracking-[-0.32px]"
        placeholder="제목을 입력하세요."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.querySelector(":focus")) {
            setIsFocused(false);
          }
        }}
      ></textarea>
    </div>
  );
};

export default WriteFormContent;
