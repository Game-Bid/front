"use client";

import Dnd from "@/components/common/Dnd";
// import CustomIcon from "@/Icons";
import React, { useState } from "react";
import { useToast } from "@/hook/useToast";
const Page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { showToast } = useToast();

  const handleClick = () => {
    showToast("success", "성공!", "작업이 성공적으로 완료되었습니다.");
  };
  return (
    <div className="flex-center h-screen">
      <div className="">
        {/* <CustomIcon icon="LOGO_SVG" className="w-[32px] h-[32px]" />{" "} */}
        {/* 예시 */}
        <Dnd files={files} setFiles={setFiles} />
        <button onClick={handleClick}>토스트 보여주기</button>
      </div>
    </div>
  );
};

export default Page;
