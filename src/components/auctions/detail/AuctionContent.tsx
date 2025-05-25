import { AuctionItem } from "@/_types/auctions/AuctionItem";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { SwiperSlide, Swiper } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import ProfileImage from "@/components/common/ProfileImage";
import Image from "next/image";
import AuctionInfo from "./AuctionInfo";
interface AuctionContentProps {
  data: AuctionItem;
}

export type TimerStatus = "beforeStart" | "progress" | "disabled";

const AuctionContent = ({ data }: AuctionContentProps) => {
  const start = dayjs.utc(data.startTime);
  const end = dayjs.utc(data.endTime);

  const status = dayjs().isBefore(start)
    ? "beforeStart"
    : dayjs().isBefore(end)
    ? "progress"
    : "disabled";

  const swiperRef = useRef<SwiperClass | null>(null);
  const memoizedImages = useMemo(() => data.images, [data.images]);
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    const swiper = swiperRef.current;
    return () => {
      swiper?.destroy();
    };
  }, []);

  return (
    <div className="grid grid-rows-1 grid-cols-16 laptop:grid-cols-12 tablet:flex tablet:flex-col-reverse gap-[20px]">
      <div className="col-span-9 laptop:col-span-6 flex flex-col gap-l-5">
        <div className="flex flex-col gap-l-2">
          <div className="h-[337px] w-full border border-borderDivider bg-bgGrayDepth2 flex-center overflow-hidden">
            {data.images.length === 0 ? (
              <p className="text-fgGrayDefault text-0.875 leading-[1.4] tracking-[-0.28px]">
                이미지가 없습니다.
              </p>
            ) : (
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="mySwiper w-full h-full"
                slidesPerView={1}
                slidesPerGroup={1}
                loop={data.images.length > 1}
                spaceBetween={0}
                allowTouchMove={true}
                onSlideChange={(swiper) => {
                  setActiveImage(swiper.activeIndex);
                }}
              >
                {memoizedImages.map((img) => (
                  <SwiperSlide
                    key={img.id}
                    className="flex-center w-full h-full"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={"bid-image"}
                      className="w-full h-full object-contain"
                      fill
                    />
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
                  // className="w-full border border-borderDivider h-[68px] cursor-pointer"
                  className={`w-full h-[68px] border-2 ${
                    activeImage === imgIdx
                      ? "border-fgPrimaryDefault"
                      : "border-transparent opacity-40"
                  } h-[68px] cursor-pointer relative`}
                  onClick={() => swiperRef.current?.slideToLoop(imgIdx)}
                >
                  <Image
                    src={img.imageUrl}
                    alt={"bid-image"}
                    className="w-full h-full object-cover"
                    fill
                  />
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
      <div className="col-span-7 laptop:col-span-6 sticky tablet:relative top-[144px] tablet:top-0 w-full h-fit p-l-1.5 bg-bgGrayDepth2 rounded-lg flex flex-col gap-l-1.5">
        <AuctionInfo status={status} data={data} />
      </div>
    </div>
  );
};

export default AuctionContent;
