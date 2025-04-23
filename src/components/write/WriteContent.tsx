"use client";

import React from "react";
import { GameList } from "@/_types/game/game";
import SearchGames from "./SearchGames";
import Button from "../common/Button";
import { useForm } from "react-hook-form";

const defaultValues = {
  game: {
    gameName: "",
    server: "",
    serverNum: "",
  },
  itemType: "item", // item or account
  accountType: "", // 구글 / 게스트 / 기타 (item 선택 시 비어 있음)
  auctionPeriod: "", // 예: "3일", "5일", "7일" 등
  startingPrice: "", // 숫자
  allowBuyNow: false, // 즉시 구매 허용 여부
  buyNowPrice: "", // allowBuyNow가 true일 경우에만 입력
  image: null, // 파일 또는 URL
  title: "",
  description: "",
};

const WriteContent = ({ games }: { games: GameList }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  console.log(register, errors, setValue, watch);

  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-[calc(100vh-82px)] flex-center flex-col">
      <div className="flex flex-col gap-[3rem]">
        <h1 className="text-[2.25rem] font-semibold leading-[130%] tracking-[-0.045rem]">
          경매 등록
        </h1>
        <div className="flex flex-col gap-1">
          <p className="tracking-[-0.0225rem] text-[1.125rem] ">게임선택</p>
          <SearchGames games={games} />
        </div>
        <div className="self-end w-[200px]">
          <Button title="경매등록" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
