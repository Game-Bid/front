"use client";

import React from "react";
import { GameList } from "@/_types/game/game";
const WriteContent = ({ games }: { games: GameList }) => {
  console.log(games);

  return (
    <div className="w-full min-h-[calc(100vh-82px)] flex-center flex-col">
      <div>
        <p>경매 등록</p>
        <div></div>
      </div>
      <div>경매등록</div>
    </div>
  );
};

export default WriteContent;
