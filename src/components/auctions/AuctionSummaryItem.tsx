import React from "react";
import AuctionLabel from "./AuctionLabel";
import ProfileImage from "../common/ProfileImage";
import CustomIcon from "@/Icons/Icon";

const AuctionSummaryItem = () => {
  return (
    <div className="p-1.25 bg-fillGrayDefault rounded-[20px] flex flex-col gap-0.75  leading-[1.4] text-fgGrayDefault">
      <AuctionLabel type="item" />

      <div className="text-0.875 traking-[-0.28px]">{`메이플스토리 > 스카니아`}</div>
      <div className="h-[50px] tablet:h-[48px] text-1.125 font-semibold traking-[-0.36px] break-words line-clamp-2 ">
        공59 럭6 레드 크리븐 팝니다 공59 럭6 레드 크리븐 팝니다 공59 럭6 레드
        크리븐 팝니다
      </div>
      <div className="text-fgPrimaryAccent text-1.125 font-semibold traking-[-0.36px]">
        185,000원
      </div>
      <div>
        <p className="text-0.875 traking-[-0.28px]">2일 07시간 42분 08초</p>
      </div>
      {/* <div></div> */}
      <hr className="border-borderDefault" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.25">
          <ProfileImage nickname="채영" size="sm" hover={false} />
          <p className="truncate text-0.875 leading-[1.4] traking-[-0.28px] ">
            Nickname
          </p>
        </div>
        <div className="flex gap-0.5">
          <div className="flex items-center gap-0.25">
            <CustomIcon icon="HEART" className="w-[24px] h-[24px]" />
            <p className="text-0.875 leading-[1.4] traking-[-0.28px]">Like</p>
          </div>
          <div className="flex items-center gap-0.25">
            <CustomIcon icon="EYE_SVG" className="w-[24px] h-[24px]" />
            <p className="text-0.875 leading-[1.4] traking-[-0.28px]">Look</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSummaryItem;
