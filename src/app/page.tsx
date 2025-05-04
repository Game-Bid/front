"use client";

import Button from "@/components/common/Button";
import Dnd from "@/components/common/Dnd";
import { showToast } from "@/components/common/Toast";
// import CustomIcon from "@/Icons";
import React, { useState } from "react";

const Page = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex-center h-screen">
      <div className=" flex flex-col gap-6">
        {/* <CustomIcon icon="LOGO_SVG" className="w-[32px] h-[32px]" />{" "} */}
        {/* 예시 */}
        <Dnd files={files} setFiles={setFiles} />
        <Button
          title="Success"
          onClick={() => showToast("success", "Success 제목", "Success 메세지")}
        />
        <Button
          title="Warning"
          onClick={() => showToast("warning", "Warning 제목", "Warning 메세지")}
        />
      </div>
    </div>
  );
};

export default Page;
