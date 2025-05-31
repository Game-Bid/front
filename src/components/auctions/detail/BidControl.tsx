import Button from "@/components/common/Button";
import CommonInput from "@/components/common/input/CommonInput";
import React, { useState } from "react";
import BidButton from "./BidButton";
import CustomIcon from "@/Icons/Icon";
import { AuctionItem } from "@/_types/auctions/AuctionItem";

interface BidControl {
  data: AuctionItem;
  currentPrice: number;
  auctionId: string;
}

const BidControl = ({ data, currentPrice, auctionId }: BidControl) => {
  const [bidPrice, setBidPrice] = useState<number>(currentPrice);
  const [buyNowPrice, setBuyNowPrice] = useState<number | null>(null);

  return (
    <div className="flex gap-0.75">
      <div className="flex-1 w-full flex flex-col gap-l-0.25">
        <p className="text-fgGrayDefault text-[14px]">즉시 구매가</p>
        <div className="flex flex-col gap-l-0.5">
          <CommonInput
            placeholder={data.buyNowPrice?.toLocaleString() || ""}
            value={buyNowPrice ? buyNowPrice.toLocaleString() : ""}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setBuyNowPrice(value ? Number(value) : null);
            }}
            onBlur={(e) => {
              if (buyNowPrice) {
                e.target.value = buyNowPrice.toLocaleString();
              }
            }}
            disabled={!data.buyNowPrice}
          />
          <Button
            title="즉시 구매하기"
            variant="secondary"
            width="100%"
            disabled={!data.buyNowPrice}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-l-0.25">
        <p className="text-fgGrayDefault text-[14px]">희망 입찰가</p>
        <div className="flex flex-col gap-l-0.5">
          <button className="input-base input-default flex items-center justify-between ">
            <div
              onClick={() => setBidPrice((prev) => Math.max(0, prev - 10000))}
            >
              <CustomIcon icon="CIRCLE-MINUS" className="w-[20px] h-[20px]" />
            </div>
            <div className="w-full cursor-default text-1 leading-[1.4] tracking-[-0.32px]">
              {bidPrice?.toLocaleString() || 0}
            </div>
            <div onClick={() => setBidPrice((prev) => prev + 10000)}>
              <CustomIcon icon="CIRCLE-PLUS" className="w-[20px] h-[20px]" />
            </div>
          </button>
          <BidButton bidAmount={bidPrice} auctionId={Number(auctionId)} />
        </div>
      </div>
    </div>
  );
};

export default BidControl;
