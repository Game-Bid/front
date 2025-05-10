import React from "react";
import CustomIcon from "@/Icons";
import { cn } from "../../_utils/clsx";
import { motion } from "motion/react";

export type ToastType = "success" | "warning";
interface ToastMessageProps {
  type: ToastType;
  title: string;
  content: string;
}

const ToastMessage = ({ type, title, content }: ToastMessageProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 0 }}
      transition={{
        layout: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      className={cn(
        " flex items-center w-[400px] h-[70px] px-1 py-0.75 gap-1 bg-fillGrayDefault rounded-md shadow-[0px_16px_24px_rgba(0,0,0,0.14),_0px_6px_30px_rgba(0,0,0,0.12),_0px_8px_10px_rgba(0,0,0,0.20)] mb-0.5 leading-[140%]"
      )}
    >
      <div className="relative w-[4rem] h-[4rem] flex-center">
        <div
          className={`absolute inset-0 rounded-full ${
            type === "success"
              ? "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,237,81,0.12)_0%,rgba(0,237,123,0)_100%)]"
              : "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,66,72,0.13)_0%,rgba(240,66,72,0)_100%)]"
          }`}
        />
        <div className="w-[1.5rem] h-[1.5rem]">
          <CustomIcon
            icon={
              type === "success" ? "TOAST_CHECK_ICON_SVG" : "TOAST_WARNING_ICON"
            }
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-1 font-bold text-fgGrayFocused tracking-[-0.02rem]">
          {title}
        </p>
        <p className="text-0.875 text-fgGrayPlaceholder tracking-[-0.0175rem] ">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default ToastMessage;
