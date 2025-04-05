"use client";

import { Skeleton } from "@heroui/react";
import React from "react";

const ButtonSkeleton = () => {
  return (
    <div className="w-[25px] h-[25px] bg-black">
      <Skeleton className="w-[25px] h-[25px] bg-white border border-red-500" />
    </div>
  );
};

export default ButtonSkeleton;
