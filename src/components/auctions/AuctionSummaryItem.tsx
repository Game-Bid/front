import React from "react";
import AuctionLabel from "./AuctionLabel";

const AuctionSummaryItem = () => {
  return (
    <div className="p-20 bg-fillGrayDefault rounded-[1.25rem] flex flex-col gap-[0.75rem] max-w-[344px]">
      <AuctionLabel type="item" />
      <div className=""></div>
      <div className="">{`메이플스토리 > 스카니아`}</div>
      <div className="">공59 럭6 레드 크리븐 팝니다</div>
      <div>185,000원</div>
      <div>2일 07시간 42분 08초</div>
      <div></div>
      <div>
        <div>Nickname</div>
      </div>
    </div>
  );
};

export default AuctionSummaryItem;
