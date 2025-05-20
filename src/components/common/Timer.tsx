import CustomIcon from "@/Icons/Icon";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useEffect, useState } from "react";
import { TimerStatus } from "../auctions/detail/AuctionContent";

dayjs.extend(duration);

interface TimerProps {
  startTime: Dayjs;
  endTime: Dayjs;
  status: TimerStatus;
}

const Timer = ({ startTime, endTime, status }: TimerProps) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    if (status === "disabled") return;

    const interval = setInterval(() => {
      const currentTime = dayjs();
      setNow(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [status, start, end]);

  const statusClassMap: Record<TimerStatus, string> = {
    beforeStart: "border-systemSuccess text-systemSuccess",
    progress: "border-fgPrimaryAccent text-fgPrimaryAccent",
    disabled: "border-systemFailed text-systemFailed",
  };

  const getFormattedDuration = (ms: number) => {
    const d = dayjs.duration(ms);
    const days = Math.floor(d.asDays());
    const h = String(Math.floor(d.asHours()) % 24).padStart(2, "0");
    const m = String(d.minutes()).padStart(2, "0");
    const s = String(d.seconds()).padStart(2, "0");

    if (days > 0) {
      return `${days}일 ${h}시간 ${m}분 ${s}초`;
    } else {
      return `${h}시간 ${m}분 ${s}초`;
    }
  };

  const content =
    status === "beforeStart"
      ? `시작까지 ${getFormattedDuration(start.diff(now))}`
      : status === "progress"
      ? `마감까지 ${getFormattedDuration(end.diff(now))}`
      : "경매 종료됨";

  return (
    <div
      className={`px-0.75 py-0.5 rounded-max border flex items-center gap-0.5 w-fit ${statusClassMap[status]}`}
    >
      <CustomIcon
        icon="CLOCK-01"
        className="w-[24px] h-[24px]"
        fill={
          status === "beforeStart"
            ? "#00DF80"
            : status === "progress"
            ? "#949CF7"
            : "#E22933"
        }
      />
      {content}
    </div>
  );
};

export default Timer;
