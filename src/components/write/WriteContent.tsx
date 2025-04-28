"use client";

import React, { useState } from "react";
import { GameList } from "@/_types/game/game";
import SearchGames from "./SearchGames";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import Radio from "../common/Radio";
import Chip from "../common/Chip";
import MultiInput from "../common/input/MultiInput";
import TextInput from "../common/input/TextInput";
import CommonInput from "../common/input/CommonInput";

const writeForm = {
  game: {
    gameName: "",
    server: "",
    serverNum: "",
  },
  itemType: "", // item or account
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
    defaultValues: writeForm,
  });

  const onSubmit = (data: typeof writeForm) => {
    console.log(data);
  };

  const radioArr = [
    { label: "아이템", value: "item" },
    { label: "계정", value: "account" },
  ];

  const chipArr = [
    { label: "6시간", value: "6h" },
    { label: "12시간", value: "12h" },
    { label: "1일", value: "1d" },
    { label: "3일", value: "3d" },
    { label: "5일", value: "5d" },
    { label: "일주일", value: "7d" },
  ];

  const titleTextStyle = "tracking-[-0.0225rem] text-[1.125rem] text-[18px] ";

  return (
    <div className="w-full min-h-[calc(100vh-82px)] flex-center flex-col">
      <div className="flex flex-col gap-[3rem] w-[600px]">
        <h1 className="text-[2.25rem] font-semibold leading-[130%] tracking-[-0.045rem]">
          경매 등록
        </h1>
        <div className="flex flex-col gap-48">
          <div className="flex flex-col gap-1">
            <p className={titleTextStyle}>게임선택</p>
            <SearchGames games={games} />
          </div>
          <div className="flex flex-col gap-1">
            <p className={titleTextStyle}>종류선택</p>
            <div className="flex gap-2">
              {radioArr.map((item, idx) => (
                <Radio
                  groupName="certificate"
                  listData={item}
                  keyId={item.value + idx}
                  setValue={(value) => setValue("itemType", value)}
                  key={item.value + idx}
                  now={watch("itemType")}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className={titleTextStyle}>경매기간</p>
            <div className="flex gap-5">
              {chipArr.map((item, idx) => (
                <Chip
                  key={item.value + idx}
                  listData={item}
                  selected={watch("auctionPeriod") === item.value}
                  onClick={(value) => setValue("auctionPeriod", value)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className={titleTextStyle}>경매시작가</p>
            <CommonInput />
          </div>
        </div>
        <div className="self-end w-[200px]">
          <Button title="경매등록" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
