import CustomIcon from "@/Icons";
import React from "react";

const Page = () => {
  return (
    <div className="flex-center h-screen bg-fillGrayDefault ">
      <div className="w-[200px] flex gap-2 items-center ml-1 mt-1 text-fillPrimaryFocused ">
        메인페이지 입니다.
        <CustomIcon icon="NEW_SVG" className="w-[32px] h-[32px]" /> {/* 예시 */}
      </div>
    </div>
  );
};

export default Page;
