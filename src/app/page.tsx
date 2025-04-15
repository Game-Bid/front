"use client";

import Dnd from "@/components/common/Dnd";
// import CustomIcon from "@/Icons";
import React, { useState } from "react";

const Page = () => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="flex-center h-screen">
      <div className="">
        {/* <CustomIcon icon="LOGO_SVG" className="w-[32px] h-[32px]" />{" "} */}
        {/* 예시 */}
        <Dnd files={files} setFiles={setFiles} />
      </div>
    </div>
  );
};

export default Page;
