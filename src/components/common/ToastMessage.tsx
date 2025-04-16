import React from "react";
import CustomIcon from "@/Icons";
import { cn } from "../../_utils/clsx";
// import { ToastType } from "@/types/toast";

export type ToastType = "success" | "warning";
interface ToastMessageProps {
  type: ToastType;
  title: string;
  content: string;
}

const ToastMessage = ({ type, title, content }: ToastMessageProps) => {
  return (
    <div
      className={cn(
        "z-[200] flex items-center w-[25rem] p-[0.75rem] gap-[1rem] bg-fillGrayDefault rounded-[0.75rem] shadow-[0px_16px_24px_rgba(0,0,0,0.14),_0px_6px_30px_rgba(0,0,0,0.12),_0px_8px_10px_rgba(0,0,0,0.20)] mb-2"
      )}
    >
      <div className="relative w-[3rem] h-[3rem] flex-center">
        <div
          className={`absolute inset-0 rounded-full ${
            type === "success"
              ? "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,237,81,0.12)_0%,rgba(0,237,123,0)_100%)]"
              : "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,66,72,0.13)_0%,rgba(240,66,72,0)_100%)]"
          }`}
        />
        <div className="w-[1.5rem] h-[1.5rem]">
          <CustomIcon
            icon={type === "success" ? "Check_Icon" : "Warning_Icon"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[0.25rem]">
        <p className="text-[1rem] font-bold text-fgGrayFocused tracking-[-0.02rem]">
          {title}
        </p>
        <p className="text-[0.875rem] text-fgGrayPlaceholder tracking-[-0.0175rem] ">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ToastMessage;
