"use client";

import CustomIcon from "@/Icons/Icon";
import useDeviceSize from "@/hooks/responsive/useDeviceSize";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ResponsiverSidebar from "./ResponsiverSidebar";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isTablet } = useDeviceSize();
  const pathname = usePathname();
  const buttonStyle =
    "flex-center h-[40px] px-1.125 rounded-[20px] border border-borderPrimary text-1 leading-[1.4] tracking-[-0.32px] font-semibold text-fgGrayDefault";

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return;

  return (
    <div className="w-screen fixed top-0 left-0 z-[50] bg-bgGrayDepth1 border-b border-borderDivider ">
      <div className="w-full flex items-center justify-between py-1.25 px-1.5 mx-auto">
        <div className="flex items-center gap-2.5">
          <Link
            href={"/"}
            className="flex items-center gap-[8px] cursor-pointer"
          >
            <CustomIcon icon="LOGO_SVG" className="w-[20px] h-[20px]" />
            <p className="text-1.25 leading-[1.4] tracking-[-0.4px] font-bold uppercase">
              GameBid
            </p>
          </Link>
          {!isTablet && (
            <ul className="flex items-center gap-1.25 text-1">
              <li className="cursor-pointer">계정 경매</li>
              <li className="cursor-pointer">아이템 경매</li>
              <li className="cursor-pointer">고객 지원</li>
            </ul>
          )}
        </div>
        {isTablet ? (
          <div onClick={() => setSidebarOpen(true)} className="cursor-pointer">
            <CustomIcon icon="MENU" className="w-[24px] h-[24px]" />
          </div>
        ) : (
          <div className="flex items-center gap-1.25">
            <div className="flex items-center gap-[15px]">
              <Link href={"/my-page"}>
                <CustomIcon
                  icon="GNB1"
                  className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                />
              </Link>
              <CustomIcon
                icon="GNB2"
                className="w-[1.5rem] h-[1.5rem] cursor-pointer"
              />
              <CustomIcon
                icon="GNB3"
                className="w-[1.5rem] h-[1.5rem] cursor-pointer"
              />
            </div>
            <Link href={"/write"}>
              <button className={buttonStyle}>경매 생성</button>
            </Link>
            <Link href={"/login"}>
              <button className={buttonStyle}>로그인</button>
            </Link>
          </div>
        )}
      </div>
      <ResponsiverSidebar
        isOpen={sidebarOpen}
        close={() => setSidebarOpen(false)}
      />
    </div>
  );
};

export default Header;
