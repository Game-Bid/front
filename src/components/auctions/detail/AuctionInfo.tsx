import { AuctionItem } from "@/_types/auctions/AuctionItem";
import React, { useState } from "react";
import { TimerStatus } from "./AuctionContent";
import CustomIcon from "@/Icons/Icon";
import CommonInput from "@/components/common/input/CommonInput";
import Timer from "@/components/common/Timer";
import dayjs from "dayjs";
import BidUserInfo from "./BidUserInfo";
import Button from "@/components/common/Button";
import BidButton from "./BidButton";
import { useGetSubscribeAuctionId } from "@/hooks/fetcher/auctions/useGetSubscribeAuctionId";

interface AuctionInfoProps {
  data: AuctionItem;
  status: TimerStatus;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  auctionId: string;
}

const AuctionInfo = ({
  data,
  status,
  start,
  end,
  auctionId,
}: AuctionInfoProps) => {
  const { auction } = useGetSubscribeAuctionId(Number(auctionId));

  const currentPrice = auction?.currentPrice || data.currentPrice;
  const [bidPrice, setBidPrice] = useState<number>(currentPrice);
  const [buyNowPrice, setBuyNowPrice] = useState<number | null>(null);

  return (
    <>
      <p className="text-fgGrayDefault text-1.5 font-semibold leading-[1.4] tracking-[-0.48px]">
        {data?.title}
      </p>
      <div className="flex flex-col gap-0.25">
        <Timer startTime={start} endTime={end} status={status} />
        <p className="text-2.5 font-bold tracking-[-0.8px]">
          {currentPrice.toLocaleString()}원{" "}
        </p>
      </div>
      <div className="flex flex-col gap-l-1">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-0.25">
            <CustomIcon icon="EYE_SVG" className="w-[24px] h-[24px]" />
            <p className="text-0.875 text-fgFrayPlaceHolder leading-[1.4] tracking-[-0.28px]">
              {data?.views}
            </p>
          </div>
        </div>
        <div className="flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]">
          <p className="w-[56px] text-fgGrayPressed">종류</p>
          <p className="text-fgGrayDefault">
            {data.auctionType === "ITEM" ? "게임아이템" : "게임계정"}
          </p>
        </div>
        <div className="flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]">
          <p className="w-[56px] text-fgGrayPressed">게임</p>
          <p className="text-fgGrayDefault">
            {data.gameName} {data.serverName && ` > ${data.serverName}`}{" "}
            {data.serverNumName && ` > ${data.serverNumName}`}
          </p>
        </div>
        <div className="flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]">
          <p className="w-[56px] text-fgGrayPressed">종류</p>
          <p className="text-fgGrayDefault">{data.auctionCode}</p>
        </div>
      </div>
      {status === "progress" && (
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
                  onClick={() =>
                    setBidPrice((prev) => Math.max(0, prev - 10000))
                  }
                >
                  <CustomIcon
                    icon="CIRCLE-MINUS"
                    className="w-[20px] h-[20px]"
                  />
                </div>
                <div className="w-full cursor-default text-1 leading-[1.4] tracking-[-0.32px]">
                  {bidPrice?.toLocaleString() || 0}
                </div>
                <div onClick={() => setBidPrice((prev) => prev + 10000)}>
                  <CustomIcon
                    icon="CIRCLE-PLUS"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </button>
              <BidButton bidAmount={bidPrice} auctionId={Number(auctionId)} />
            </div>
          </div>
        </div>
      )}
      <BidUserInfo />
    </>
  );
};

export default AuctionInfo;
