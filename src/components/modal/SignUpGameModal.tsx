"use client";

import CustomIcon from "@/Icons";
import { simpleGameType } from "@/_types/game/gamesSimple";
import { useGetGamesSimple } from "@/hooks/fetcher/game/useGetGamesSimple";
import React, { useEffect, useState } from "react";
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
  const [search, setSerach] = useState("");
  const [filteredGames, setFilteredGames] = useState<simpleGameType[] | []>();
  const { data, isLoading } = useGetGamesSimple();
  const games = data?.result;

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

  useEffect(() => {
    if (search === "") {
      setFilteredGames(games);
      return;
    }

    const filteredData = games.filter((item: simpleGameType) =>
      item.name.includes(search)
    );

    setFilteredGames(filteredData);
  }, [search, data, games]);

  if (isLoading) return null;

  if (!activeModal) return null;

  return createPortal(
    <div
      className="select-none fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-start gap-[3px] z-50"
      onClick={handleOverlayClick}
    >
      <p className="w-[600px] text-left text-1.125 leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault">
        게임 선택
      </p>
      <div className="w-[600px] px-8 flex flex-col gap- rounded-md border border-fgPrimaryAccent bg-fillGrayDefault">
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
              value={search}
              onChange={(e) => setSerach(e.target.value)}
            />
          </div>
          <hr className="my-0.25 border-borderDefault" />
        </div>
        <div>
          <ul className="flex flex-col items-start h-[247px] overflow-y-auto scrollbar-dropdown">
            {filteredGames?.map((game: simpleGameType) => (
              <li
                key={game.id}
                onClick={() => {
                  onSelectGame?.(game.name);
                  onClose();
                }}
                className="flex items-center cursor-pointer w-full min-h-[48px] px-0.75 hover:w-full hover:bg-fillGrayHovered hover:rounded-[12px] rounded-[8px]"
              >
                {game.name}
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
