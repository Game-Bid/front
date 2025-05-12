import CustomIcon from "@/Icons/Icon";
import { cn } from "@/_utils/clsx";
import React, { ReactNode, useState } from "react";

export interface DropdownType {
  label: string;
  value: string;
}

interface Props {
  listData: DropdownType[];
  placeholder?: string;
  disabled?: boolean;
  position?: "up" | "down";
  width?: string;
  select: DropdownType | null;
  setSelect: (arg: DropdownType | null) => void;
  titleIcon?: boolean;
  customIcon?: ReactNode;
}

const Dropdown = ({
  disabled = false,
  listData,
  placeholder = "header",
  position = "down",
  titleIcon = false,
  customIcon,
  width,
  select,
  setSelect,
}: Props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setActive((prev) => !prev);
  };

  const handleSelect = (item: DropdownType) => {
    setSelect(item);
    setActive(false);
  };
  return (
    <div
      className={`relative border rounded-md flex flex-col w-full cursor-pointer  ${
        active
          ? "border-borderPrimary bg-fillGrayDefault"
          : "border-transparent"
      }`}
    >
      <div className="flex flex-col ">
        {active && position === "up" && (
          <div className="flex flex-col gap-0.25 p-[8px]">
            {listData.map((item) => (
              <div
                className="h-[48px] px-12 flex items-center hover:bg-fillGrayHovered rounded-md"
                key={item.label}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        style={width ? { width } : undefined}
        className={cn(
          "h-[48px] tablet:h-[40px] px-0.75 rounded-md flex items-center justify-between text-1 transition-all duration-300",
          disabled
            ? "bg-fillGrayDefault text-fgGrayDisabled cursor-not-allowed"
            : active
            ? "bg-fillGrayFocused"
            : select !== null
            ? "text-fgGrayEntered bg-fillGrayDefault"
            : "bg-fillGrayDefault text-fgGrayPlaceholder "
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-8 w-full text-nowrap">
          {titleIcon && customIcon}
          {select !== null ? select.label : placeholder}
        </div>
        <CustomIcon
          className="w-[24px] h-[24px]"
          icon={active ? "CHEVRON-UP" : "CHEVRON-DOWN"}
        />
      </div>
      <div className="flex flex-col ">
        {active && position === "down" && (
          <div className="flex flex-col gap-0.25 p-[8px]">
            {listData.map((item) => (
              <div
                className="h-[48px] tablet:h-[40px] text-1 px-0.75 flex items-center hover:bg-fillGrayHovered rounded-md"
                key={item.label}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
