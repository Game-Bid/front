"use client";

import React from "react";

import AuctionSummaryItem from "@/components/auctions/AuctionSummaryItem";
import AuctionContent from "@/components/auctions/detail/AuctionContent";
import { useGetAuctionsId } from "@/hooks/fetcher/auctions/useGetAuctionsId";
import { usePathname } from "next/navigation";

const testArr = [1, 2, 3, 4, 5, 6];

const Page = () => {
  const pathname = usePathname();
  const nowID = pathname.split("/")[3];
  const { data } = useGetAuctionsId(nowID);

  if (!data?.result) return null;

  return (
    <div className="py-l-4 max-w-[1080px] w-full tablet:w-full flex flex-col gap-l-7.5 mx-auto laptop:px-[20px]">
      <AuctionContent data={data?.result} auctionId={nowID} />

      <div className="flex flex-col gap-l-1.5">
        <p className="text-fgGrayDefault font-semibold text-1.5 leading-[1.4] tracking-[-0.48px]">
          현재 경매중인{" "}
          <span className="text-fgPrimaryAccent">메이플스토리</span> 아이템
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {testArr.map((item) => (
            <AuctionSummaryItem key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
