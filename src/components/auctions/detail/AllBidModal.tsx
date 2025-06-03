import CustomIcon from "@/Icons/Icon";
import ProfileImage from "@/components/common/ProfileImage";
import { useGetAuctionBids } from "@/hooks/fetcher/auctions/useGetAuctionBids";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

import React from "react";

interface AllBidModalProps {
  setIsOpen: (isOpen: boolean) => void;
  auctionId: string;
}

const AllBidModal = ({ setIsOpen, auctionId }: AllBidModalProps) => {
  const { data: bidRecent } = useGetAuctionBids(Number(auctionId));

  return (
    <div className={`fixed inset-0 flex-center z-[100] bg-black bg-opacity-80`}>
      <div className="flex flex-col gap-1.5 w-[700px]">
        <div className="flex items-center justify-between">
          <p className="text-fgGrayDefault text-2 font-semibold leading-[1.3] tracking-[-0.64px]">
            입찰 내역
          </p>
          <div
            className="w-[40px] h-[40px] flex-center bg-[rgba(255,255,255,0.2)] rounded-max cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <CustomIcon icon="ICON_X" className="w-[24px] h-[24px]" />
          </div>
        </div>
        <div className="rounded-sm bg-bgGrayDepth2">
          <div className="mx-1.5 my-1 max-h-[510px] overflow-y-auto scrollbar-dropdown">
            {bidRecent?.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center w-full py-0.75 ${
                  idx === 0 ? "text-fgPrimaryAccent" : "text-"
                }`}
              >
                <div
                  className={`flex items-center gap-[8px] w-[calc(100%/3)] `}
                >
                  <ProfileImage nickname={item.email} size="sm" />
                  <p>{item.email}</p>
                </div>
                <div className="w-[calc(100%/3)]">
                  {item.amount.toLocaleString()}원
                </div>
                <div className="w-[calc(100%/3)] truncate ">
                  {/* {dayjs(item.updatedAt).format("YYYY.MM.DD a hh:mm:ss")} */}
                  {dayjs
                    .utc(item.updatedAt)
                    .tz("Asia/Seoul")
                    .format("YYYY.MM.DD a hh:mm:ss")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBidModal;
