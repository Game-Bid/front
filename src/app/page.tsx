"use client";

import Dnd from "@/components/common/Dnd";
import { showToast } from "@/components/common/Toast";
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
        <button
          onClick={() => showToast("success", "Success 제목", "Success 메세지")}
          className="bg-black text-white rounded-2xl px-2 py-1 m-2"
        >
          Success
        </button>{" "}
        <button
          onClick={() => showToast("warning", "Warning 제목", "Warning 메세지")}
          className="bg-black text-white rounded-2xl px-2 py-1 m-2"
        >
          Warning
        </button>
      </div>
    </div>
  );
};

export default Page;
