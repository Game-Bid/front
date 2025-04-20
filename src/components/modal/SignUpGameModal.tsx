"use client";

import CustomIcon from "@/Icons";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface SignUpGameModalProps {
  onSelectGame?: (game: string) => void;
  activeModal: boolean;
  onClose: () => void;
}

const SignUpGameModal = ({
  onSelectGame,
  activeModal,
  onClose,
}: SignUpGameModalProps) => {
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const games = [
    "메이플스토리",
    "메이플스토리월드",
    "메이플스토리M",
    "메이플스토리DS",
    "메이플스토리빌리지",
  ];

  if (!activeModal) return null;

  return createPortal(
    <div
      className="select-none fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-start gap-4 z-50"
      onClick={handleOverlayClick}
    >
      <p className="w-[600px] text-left text-[18px] leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault">
        게임 선택
      </p>
      <div className="w-[600px] px-8 flex flex-col gap-3 rounded-[12px] border border-fgPrimaryAccent bg-fillGrayDefault">
        <div className="flex flex-col">
          <div className="flex gap-[10px] items-center">
            <button type="button">
              <CustomIcon
                icon="SEARCH_ICON_SVG"
                className="w-[24px] h-[24px] fill-none"
              />
            </button>
            <input
              type="text"
              placeholder="게임 검색"
              className="w-full py-2 rounded-[8px] h-[48px] flex bg-fillGrayDefault"
            />
          </div>
          <hr className="my-[2px]" />
        </div>
        <div>
          <ul className="flex flex-col items-start">
            {games.map((game) => (
              <li
                key={game}
                onClick={() => {
                  onSelectGame?.(game);
                  onClose();
                }}
                className="flex items-center cursor-pointer w-full h-[48px] px-3 hover:w-full hover:bg-fillGrayHovered hover:rounded-[12px] rounded-[8px]"
              >
                {game}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SignUpGameModal;
