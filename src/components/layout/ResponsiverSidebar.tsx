import CustomIcon from "@/Icons/Icon";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";

const menuArr = [
  { title: "계정 경매", link: "/account" },
  { title: "아이템 경매", link: "/item" },
  { title: "고객 지원", link: "/support" },
  { title: "알림", link: "/notifications" },
  { title: "채팅", link: "/chat" },
  { title: "마이페이지", link: "/my-page" },
];

const ResponsiverSidebar = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute right-0 top-0 bg-bgGrayDepth1 w-[393px] h-screen shadow-sm px-1.5"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="h-[60px] w-full flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <CustomIcon icon="LOGO_SVG" className="w-[20px] h-[20px]" />
              <p className="text-1.25 leading-[1.4] tracking-[-0.4px] font-bold uppercase">
                GameBid
              </p>
            </div>
            <div className="cursor-pointer" onClick={close}>
              <CustomIcon icon="CLOSE_SVG" className="w-[34px] h-[34px]" />
            </div>
          </div>
          <ul className="px-1.25 py-1.5 flex flex-col gap-3">
            {menuArr.map((item) => (
              <Link href={item.link} key={item.link}>
                <li className="text-fgGrayDefalut text-1 font-semibold leading-[1.4] tracking-[-0.28px] py-0.75 w-full">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiverSidebar;
