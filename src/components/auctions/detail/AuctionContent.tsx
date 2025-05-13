import { AuctionItem } from "@/_types/auctions/AuctionItem";
import Timer from "@/components/common/Timer";
import React from "react";

interface AuctionContentProps {
  data: AuctionItem;
}

const AuctionContent = ({ data }: AuctionContentProps) => {
  console.log(data);
  return (
    <div className="flex gap-l-1.25 h-[1000px]">
      <div className="h-[337px] w-full border border-borderDivider bg-bgGrayDepth2"></div>
      <div className="sticky top-[144px] h-fit w-[460px] p-l-1.5  bg-bgGrayDepth2 rounded-lg flex flex-col gap-l-1.5">
        <p>{data?.title}</p>
        <div>
          <Timer startTime={data?.startTime} endTime={data?.endTime} />
          <p>{data.currentPrice.toLocaleString()}원 </p>
        </div>
        <div className="flex">
          <div>{data?.views}</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionContent;
