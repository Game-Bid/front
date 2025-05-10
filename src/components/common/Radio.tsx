import React from "react";

interface Props {
  groupName: string;
  keyId: string;
  listData: {
    label: string;
    value: string;
  };
  setValue: (value: string) => void;
  now: string | null;
}

const Radio = ({ groupName, keyId, listData, setValue, now }: Props) => {
  return (
    <div>
      <input
        type="radio"
        name={groupName}
        id={keyId}
        className="peer hidden"
        checked={now === listData.value}
        onChange={() => setValue(listData.value)}
      />
      <label
        className={`w-full  h-[64px] tablet:h-[52px] px-1 rounded-md bg-fillGrayDefault flex items-center gap-0.75 cursor-pointer border hover:border-fillGrayHovered hover:text-fgGrayHovered group select-none duration-100 ${
          now === listData.value
            ? "text-fgGrayEntered border-borderPrimary"
            : "text-fgGrayPlaceholder border-transparent"
        }`}
        htmlFor={keyId}
      >
        <div
          className={`w-[18px] h-[18px] rounded-full before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full  peer-checked:bg-borderPrimary flex-center group-hover:before:bg-fillGrayHovered ${
            now === listData.value
              ? "before:bg-fillGrayDefault bg-borderPrimary"
              : "before:bg-transparent bg-fillGrayHovered "
          }`}
        ></div>
        <p className="text-1.125 peer-checked:text-fgGrayEntered">
          {listData.label}
        </p>
      </label>
    </div>
  );
};

export default Radio;
