import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import AuctionContent from "@/components/auctions/detail/AuctionContent";
import React from "react";

const testArr = [1, 2, 3, 4, 5, 6];

const Page = () => {
  return (
    <div className="py-l-4 max-w-[1080px] w-full mx-auto">
      <AuctionContent />

      <div className="grid grid-cols-3 gap-1.5">
        {testArr.map((item) => (
          <AuctionSummaryItem key={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
