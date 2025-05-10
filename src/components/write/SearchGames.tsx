"use client";

import CustomIcon from "@/Icons/Icon";
import { Game, GameList, GameServer, GameServerNum } from "@/_types/game/game";
import { WriteFormData } from "@/_types/write/WriteFormData";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const SearchGames = ({ games }: { games: GameList }) => {
  const { setValue } = useFormContext<WriteFormData>();
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const searchGamesRef = useRef<HTMLDivElement>(null);
  const [filteredGames, setFilteredGames] = useState<GameList>([]);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedServer, setSelectedServer] = useState<GameServer | null>(null);
  const [selectedServerNum, setSelectedServerNum] =
    useState<GameServerNum | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchGamesRef.current &&
        e.target instanceof Node &&
        !searchGamesRef.current.contains(e.target)
      ) {
        setFocused(false);
      }
    };

    if (focused) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [focused]);

  useEffect(() => {
    if (search === "" && !selectedGame) {
      setFilteredGames([]);

      return;
    }

    const filteredSearch = games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!selectedGame) setFilteredGames(filteredSearch);

    /* eslint-disable */
  }, [search]);

  useEffect(() => {
    if (selectedGame && selectedGame.gameServers?.length === 0) {
      setSearch("");

      setFilteredGames([selectedGame]);
      setFocused(false);

      setValue("game.gameName", selectedGame.name);
    }

    if (
      selectedGame &&
      selectedServer &&
      selectedServer.gameServerNums?.length === 0
    ) {
      setSearch("");
      setFilteredGames([selectedGame]);
      setFocused(false);

      setValue("game.gameName", selectedGame.name);
      setValue("game.server", selectedServer.name);
    }

    if (selectedGame && selectedServer && selectedServerNum) {
      setSearch("");
      setFilteredGames([selectedGame]);
      setFocused(false);

      setValue("game.gameName", selectedGame.name);
      setValue("game.server", selectedServer.name);
      setValue("game.serverNum", selectedServerNum.name);
    }
  }, [selectedGame, selectedServer, selectedServerNum]);

  // if (!games) return null;

  return (
    <div
      className={`relative flex flex-col w-full h-full px-1.5 rounded-md bg-fillGrayDefault transition-height duration-300 border  ${
        focused ? " border-borderPrimary" : "border-transparent"
      } `}
      onClick={() => {
        if (games) setFocused(true);
      }}
      ref={searchGamesRef}
    >
      <div className="h-[64px] flex items-center gap-0.5 relative ">
        <CustomIcon icon="SEARCH" className="w-[24px] h-[24px]" />
        {!selectedGame ? (
          <input
            className="w-full bg-transparent placeholder:text-fgGrayPlaceholder text-1.125 "
            placeholder="게임 이름을 입력하세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-0.75 w-full">
            <div className="flex items-center gap-0.25 h-[40px] px-1 rounded-max bg-bgGrayDepth3  ">
              <span className="text-fgPrimary text-0.875 font-semibold cursor-pointer leading-[1.4] tracking-[-0.28px]">
                {selectedGame.name}
                {selectedServer && ` > ${selectedServer.name}`}
                {selectedServerNum && ` > ${selectedServerNum.name}`}
              </span>
              <button
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGame(null);
                  setSelectedServer(null);
                  setSelectedServerNum(null);
                  setFilteredGames([]);
                  setSearch("");
                  setValue("game.gameName", "");
                  setValue("game.server", "");
                  setValue("game.serverNum", "");
                }}
              >
                <CustomIcon
                  icon="X-CIRCLE-CONTAINED"
                  className="w-[18px] h-[18px]"
                />
              </button>
            </div>
            <input
              className="flex-1 bg-transparent placeholder:text-fgGrayPlaceholder text-1"
              placeholder="다른 게임을 검색하시려면 삭제하고 선택해주세요."
              disabled
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {focused && (
        <>
          <div className="h-[1px] bg-borderDefault w-full my-[2px]"></div>
          {(search === "" || filteredGames.length === 0) && !selectedGame && (
            <div className="h-[170px] p-0.75 text-fgGrayPlaceholder text-1.125 ">
              검색결과가 없습니다.
            </div>
          )}
          {filteredGames.length > 0 && (
            <div className="h-fit text-fgGrayPlaceholder text-normal flex py-1 ">
              <div
                className={`text-1.125 text-fgGrayDefault flex flex-col gap-0.25 items-start leading-[140%]  ${
                  selectedGame ? "w-1/2" : "w-full"
                }`}
              >
                {filteredGames.map((game) => {
                  const gameName = game.name;
                  const searchLower = search.toLowerCase();
                  const index = gameName.toLowerCase().indexOf(searchLower);

                  return (
                    <div
                      key={game.id}
                      className={`h-[48px] px-0.75 flex items-center cursor-pointer rounded-md w-full ${
                        selectedGame?.id === game.id
                          ? "bg-fillPrimaryDefault"
                          : "hover:bg-fillGrayHovered hover:text-fgGrayEntered"
                      }`}
                      onClick={() => setSelectedGame(game)}
                    >
                      {index >= 0 ? (
                        <>
                          {gameName.slice(0, index)}
                          <span className="text-fgPrimaryAccent rounded-md">
                            {gameName.slice(index, index + search.length)}
                          </span>
                          {gameName.slice(index + search.length)}
                        </>
                      ) : (
                        gameName
                      )}
                    </div>
                  );
                })}
              </div>
              {selectedGame &&
                selectedGame.gameServers &&
                selectedGame.gameServers?.length > 0 && (
                  <div className="w-[1px] h-[480px] bg-borderDefault mx-[10px]"></div>
                )}
              {selectedGame &&
                selectedGame.gameServers &&
                selectedGame.gameServers?.length > 0 && (
                  <div className="w-1/2 max-h-[480px] flex">
                    <div className="w-full text-fgGrayPlaceholder text-normal overflow-y-auto scrollbar-dropdown ">
                      {selectedGame.gameServers?.map((server) => {
                        return (
                          <div key={server.id}>
                            <div
                              className={`text-1.125 text-fgGrayDefault h-[48px] px-0.75 flex items-center cursor-pointer rounded-md ${
                                selectedServer?.id === server.id
                                  ? "bg-fillPrimaryDefault"
                                  : "hover:bg-fillGrayHovered hover:text-fgGrayEntered"
                              }`}
                              onClick={() => {
                                if (selectedServer?.id === server.id) {
                                  setSelectedServer(null);
                                } else {
                                  setSelectedServer(server);
                                }
                              }}
                            >
                              {server.name}
                            </div>
                            {selectedServer?.id === server.id && (
                              <div className="flex flex-col gap-0.25">
                                {selectedServer.gameServerNums?.map((num) => {
                                  return (
                                    <div
                                      key={num.id}
                                      className={`text-fgGrayDefault text-1.125 h-[48px] px-1.5 flex items-center hover:bg-fillGrayHovered hover:text-fgGrayHovered rounded-md cursor-pointer ${
                                        selectedServerNum?.id === num.id
                                          ? "bg-fillPrimaryDefault"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (selectedServerNum?.id === num.id) {
                                          setSelectedServerNum(null);
                                        } else {
                                          setSelectedServerNum(num);
                                        }
                                      }}
                                    >
                                      ㄴ{num.name}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchGames;
