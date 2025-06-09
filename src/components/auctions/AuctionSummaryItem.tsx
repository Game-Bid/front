import React from "react";
import AuctionLabel from "./AuctionLabel";
import ProfileImage from "../common/ProfileImage";
import CustomIcon from "@/Icons/Icon";
import { AuctionIdGame } from "@/_types/auctions/AuctionIdGame";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

interface AuctionSummaryItemProps {
  game: AuctionIdGame;
}

const AuctionSummaryItem = ({ game }: AuctionSummaryItemProps) => {
  return (
    <div className="p-1.25 bg-fillGrayDefault rounded-[20px] flex flex-col gap-0.75  leading-[1.4] text-fgGrayDefault">
      <AuctionLabel type="item" />

      <div className="text-0.875 traking-[-0.28px]">{`${game.gameName} > ${game.gameServers[0]}`}</div>
      <div className="h-[50px] tablet:h-[48px] text-1.125 font-semibold traking-[-0.36px] break-words line-clamp-2 ">
        {game.title}
      </div>
      <div className="text-fgPrimaryAccent text-1.125 font-semibold traking-[-0.36px]">
        {game.currentPrice.toLocaleString()}원
      </div>
      <div>
        <p className="text-0.875 traking-[-0.28px]">
          {dayjs(game.endTime).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>

      <hr className="border-borderDefault" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.25">
          <ProfileImage nickname={game.nickname} size="sm" hover={false} />
          <p className="truncate text-0.875 leading-[1.4] traking-[-0.28px] ">
            {game.nickname}
          </p>
        </div>
        <div className="flex gap-0.5">
          <div className="flex items-center gap-0.25">
            <CustomIcon icon="EYE_SVG" className="w-[24px] h-[24px]" />
            <p className="text-0.875 leading-[1.4] traking-[-0.28px]">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSummaryItem;
