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
      className={`px-20 h-40 text-fgGrayDefault w-fit flex-center rounded-max duration-300 cursor-pointer border line-clamp-1 ${
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
