import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import AuctionContent from "@/components/auctions/detail/AuctionContent";
import React from "react";

const Page = () => {
  return (
    <div className="pt-32 pb-64 max-w-[1200px] w-full mx-auto">
      <AuctionContent />
      <AuctionSummaryItem />
    </div>
  );
};

export default Page;
