import CustomIcon from "@/Icons/Icon";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { useEffect, useState } from "react";

dayjs.extend(duration);

interface TimerProps {
  startTime: string;
  endTime: string;
}

type TimerStatus = "beforeStart" | "progress" | "disabled";

const Timer = ({ startTime, endTime }: TimerProps) => {
  // const now = dayjs();
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000); // 1초마다 now 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 clear
  }, []);

  const start = dayjs(startTime);
  const end = dayjs(endTime);

  let status: TimerStatus;

  if (now.isBefore(start)) {
    status = "beforeStart";
  } else if (now.isBefore(end)) {
    status = "progress";
  } else {
    status = "disabled";
  }

  // 상태별 Tailwind 클래스
  const statusClassMap: Record<TimerStatus, string> = {
    beforeStart: "border-systemSuccess text-systemSuccess",
    progress: "border-fgPrimaryAccent text-fgPrimaryAccent",
    disabled: "border-systemFailed text-systemFailed",
  };

  const getFormattedDuration = (ms: number) => {
    const d = dayjs.duration(ms);
    const h = String(Math.floor(d.asHours())).padStart(2, "0");
    const m = String(d.minutes()).padStart(2, "0");
    const s = String(d.seconds()).padStart(2, "0");
    return `${h}시간 ${m}분 ${s}초`;
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
