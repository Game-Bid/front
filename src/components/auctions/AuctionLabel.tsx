import CustomIcon from "@/Icons/Icon";
import React from "react";

interface Props {
  type: "item" | "account";
}

const AuctionLabel = ({ type }: Props) => {
  return (
    <div
      className={`rounded-max flex-center gap-4 px-8 h-[28px] w-fit bg-fillGrayDefault ${
        type === "item"
          ? "shadow-[0_0_20px_rgba(255,103,103,0.4)]"
          : "shadow-[0px 0px_20px_0px_rgba(240,74,255,0.40)]"
      }`}
    >
      <CustomIcon icon={type === "item" ? "PACKAGE-ITEM" : "USER-PROFILE"} />
      <p
        className={`text-[0.75rem] text-nowrap ${
          type === "item" ? "text-[#FF6767]" : "text-[#F04AFF] "
        }`}
      >
        {type === "item" ? "아이템" : "계정"}
      </p>
    </div>
  );
};

export default AuctionLabel;
