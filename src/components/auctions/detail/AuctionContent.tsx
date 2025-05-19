import CustomIcon from "@/Icons/Icon";
import { AuctionItem } from "@/_types/auctions/AuctionItem";
import Button from "@/components/common/Button";
import Timer from "@/components/common/Timer";
import CommonInput from "@/components/common/input/CommonInput";
import React, { useState } from "react";
import BidUserInfo from "./BidUserInfo";
// import { useGetAuthMy } from "@/hooks/fetcher/auth/useGetAuthMy";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { SwiperSlide, Swiper } from "swiper/react";
import ProfileImage from "@/components/common/ProfileImage";
interface AuctionContentProps {
  data: AuctionItem;
}

export type TimerStatus = "beforeStart" | "progress" | "disabled";

const AuctionContent = ({ data }: AuctionContentProps) => {
  // console.log(data);
  const start = dayjs.utc(data.startTime);
  const end = dayjs.utc(data.endTime);

  const status = dayjs().isBefore(start)
    ? "beforeStart"
    : dayjs().isBefore(end)
    ? "progress"
    : "disabled";

  // const { data: authData } = useGetAuthMy();

  // console.log(authData);

  const [bidPrice, setBidPrice] = useState<number>(data.currentPrice || 0);
  const [buyNowPrice, setBuyNowPrice] = useState<number | null>(null);

  return (
    <div className="grid grid-rows-1 grid-cols-16 laptop:grid-cols-12 tablet:flex tablet:flex-col  gap-[20px]">
      <div className="col-span-9 laptop:col-span-6 flex flex-col gap-l-5">
        <div className="flex flex-col gap-l-2">
          <div className="h-[337px] w-full border border-borderDivider bg-bgGrayDepth2 flex-center">
            {data.images.length === 0 ? (
              <p className="text-fgGrayDefault text-0.875 leading-[1.4] tracking-[-0.28px]">
                이미지가 없습니다.
              </p>
            ) : (
              <Swiper className="w-full h-full" slidesPerView={1}>
                {data.images.map((img) => (
                  <SwiperSlide key={img.id}>
                    <img src={img.imageUrl} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          {data.images.length !== 0 && (
            <div className="grid grid-cols-5 gap-[4px] h-[140px]">
              {data.images.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="w-full border border-borderDivider h-[68px] cursor-pointer"
                >
                  <img src={img.imageUrl} className="w-full h-full" />
                </div>
              ))}
            </div>
          )}
          <div className="text-fgGrayDefault text-1 leading-[1.4] tracking-[-0.32px]">
            {data.description}
          </div>
        </div>
        <div className="flex flex-col gap-l-1.5">
          <div className="flex items-center gap-l-0.75">
            <p className="text-1.5 leading-[1.4] tracking-[-0.48px] font-semibold">
              입찰 내역
            </p>
            <p className="text-1 leading-[1.4] tracking-[-0.32px]">
              총 {data.bidCount}건
            </p>
          </div>
          <div
            className={`rounded-md bg-bgGrayDepth2 h-[256px] w-full py-l-0.5 px-l-1 ${
              data.bidCount === 0 ? "flex-center" : "flex flex-col gap-l-1"
            }`}
          >
            {data.bidCount === 0 ? (
              <p className="text-1 leading-[1.4] tracking-[-0.32px]">
                입찰 내역이 없습니다.
              </p>
            ) : (
              <div
                className={`flex items-center text-0.875 leading-[1.4] tracking-[-0.28px]`}
              >
                <div className="flex items-center gap-[8px] w-[calc(100%/3)]">
                  <ProfileImage nickname="Jane Doe" size="sm" />
                  <p>Jane Doe</p>
                </div>
                <div className="w-[calc(100%/3)]">150,000원</div>
                <div className="w-[calc(100%/3)] truncate ">
                  2025.03.12 오전 10:52:37
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-7 laptop:col-span-6 sticky top-[144px] w-full h-fit p-l-1.5 bg-bgGrayDepth2 rounded-lg flex flex-col gap-l-1.5">
        <p className="text-fgGrayDefault text-1.5 font-semibold leading-[1.4] tracking-[-0.48px]">
          {data?.title}
        </p>
        <div className="flex flex-col gap-0.25">
          <Timer startTime={start} endTime={end} status={status} />
          <p className="text-2.5 font-bold tracking-[-0.8px]">
            {data.currentPrice.toLocaleString()}원{" "}
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
              {data.serverNumId && ` > ${data.serverNumId}`}
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
                <Button title="입찰하기" width="100%" />
              </div>
            </div>
          </div>
        )}
        <BidUserInfo />
      </div>
    </div>
  );
};

export default AuctionContent;
