import { AuctionItem } from "@/_types/auctions/AuctionItem";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");
import { SwiperSlide, Swiper } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProfileImage from "@/components/common/ProfileImage";
import Image from "next/image";
import AuctionInfo from "./AuctionInfo";
import { useGetAuctionRecent } from "@/hooks/fetcher/auctions/useGetAuctionRecent";
import Button from "@/components/common/Button";
import CustomIcon from "@/Icons/Icon";
import AllBidModal from "./AllBidModal";
import { useGetSubscribeAuctionId } from "@/hooks/fetcher/auctions/useGetSubscribeAuctionId";
import { Bids } from "@/hooks/fetcher/auctions/useGetSubscribeAuctionId";

interface AuctionContentProps {
  data: AuctionItem;
  auctionId: string;
}

export type TimerStatus = "beforeStart" | "progress" | "disabled";

const AuctionContent = ({ data, auctionId }: AuctionContentProps) => {
  const start = dayjs.utc(data.startTime);
  const end = dayjs.utc(data.endTime);

  const status = dayjs().isBefore(start)
    ? "beforeStart"
    : dayjs().isBefore(end)
    ? "progress"
    : "disabled";

  const [allBidModal, setAllBidModal] = useState(false);

  const swiperRef = useRef<SwiperClass | null>(null);
  const memoizedImages = useMemo(() => data.images, [data.images]);
  const [activeImage, setActiveImage] = useState<number>(0);
  const { data: getBidRecent } = useGetAuctionRecent(Number(auctionId), {
    enabled: data.bidCount > 0,
  });
  const { auction } = useGetSubscribeAuctionId(
    Number(auctionId),
    status === "progress"
  );
  const [bidRecent, setBidRecent] = useState<Bids[]>([]);

  console.log(bidRecent);

  useEffect(() => {
    if (getBidRecent && bidRecent.length === 0) {
      setBidRecent(getBidRecent);
    }
  }, [getBidRecent, bidRecent]);

  useEffect(() => {
    const swiper = swiperRef.current;
    return () => {
      swiper?.destroy();
    };
  }, []);

  useEffect(() => {
    if (auction && auction.bids.length > 0) {
      setBidRecent(auction.bids);
    }
  }, [auction]);

  return (
    <>
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
                  modules={[Autoplay]}
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
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  speed={1000}
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
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-l-0.75">
                <p className="text-1.5 leading-[1.4] tracking-[-0.48px] font-semibold">
                  입찰 내역
                </p>
                <p className="text-1 leading-[1.4] tracking-[-0.32px]">
                  총 {data.bidCount}건
                </p>
              </div>
              <Button
                title="전체보기"
                icon="right"
                variant="secondary"
                customIcon={
                  <CustomIcon
                    icon="RIGHT_ARROW"
                    className="w-[24px] h-[24px]"
                  />
                }
                onClick={() => setAllBidModal(true)}
              />
            </div>
            <div
              className={`rounded-md bg-bgGrayDepth2  w-full py-l-0.5 px-l-1 ${
                data.bidCount === 0 ? "flex-center" : "flex flex-col gap-l-1"
              }`}
            >
              {data.bidCount === 0 ? (
                <p className="text-1 leading-[1.4] tracking-[-0.32px] min-h-[256px] flex-center">
                  입찰 내역이 없습니다.
                </p>
              ) : (
                <div
                  className={`flex items-center flex-col gap-1 text-0.875 leading-[1.4] tracking-[-0.28px]`}
                >
                  {bidRecent?.map((item, idx) => (
                    <div key={idx} className="flex items-center w-full gap-1">
                      <div className="flex items-center gap-[8px] w-[calc(100%/3)]">
                        <ProfileImage nickname={item.email} size="sm" />
                        <p className="truncate">{item.email}</p>
                      </div>
                      <div className="w-[calc(100%/3)]">
                        {item.amount.toLocaleString()}원
                      </div>
                      <div className="w-[calc(100%/3)] truncate ">
                        {dayjs
                          .utc(item.updatedAt)
                          .tz("Asia/Seoul")
                          .format("YYYY.MM.DD a hh:mm:ss")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`col-span-7 laptop:col-span-6 sticky tablet:relative top-[144px] tablet:top-0 w-full h-fit p-l-1.5 bg-bgGrayDepth2 tablet:bg-transparent rounded-lg flex flex-col gap-l-1.5 `}
        >
          <AuctionInfo
            status={status}
            data={data}
            start={start}
            end={end}
            auctionId={auctionId}
            auction={auction}
          />
        </div>
      </div>
      {allBidModal && (
        <AllBidModal setIsOpen={setAllBidModal} auctionId={auctionId} />
      )}
    </>
  );
};

export default AuctionContent;
