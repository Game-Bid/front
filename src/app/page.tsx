import CustomIcon from "@/Icons";
import React from "react";

const Page = () => {
  return (
    <div className="w-[200px] flex gap-2 items-center ml-1 mt-1">
      메인페이지 입니다.
      <CustomIcon icon="NEW_SVG" className="w-[32px] h-[32px]" /> {/* 예시 */}
    </div>
  );
};

export default Page;
