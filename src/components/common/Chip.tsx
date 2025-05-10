import React from "react";

interface Props {
  listData: {
    label: string;
    value: string;
  };
  selected: boolean;
  onClick: (value: string) => void;
}

const Chip = ({ listData, selected, onClick }: Props) => {
  return (
    <div
      className={`px-1 h-[40px] text-0.875 tablet:h-[34px] text-fgGrayDefault w-fit flex-center rounded-max duration-300 cursor-pointer border text-nowrap leading-[1.4] ${
        selected
          ? "border-transparent bg-fillPrimaryFocused"
          : "bg-fillGrayDefault  border-transparent hover:border-fgGrayFocused hover:bg-fillGrayHovered "
      }`}
      onClick={() => onClick(listData.value)}
    >
      {listData.label}
    </div>
  );
};

export default Chip;
