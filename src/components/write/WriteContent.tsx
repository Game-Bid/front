"use client";

import React from "react";
import { GameList } from "@/_types/game/game";
import SearchGames from "./SearchGames";
import Button from "../common/Button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Radio from "../common/Radio";
import Chip from "../common/Chip";
import CommonInput from "../common/input/CommonInput";
import Dnd from "../common/Dnd";
import WriteFormContent from "./WriteFormContent";
import Switch from "../common/Switch";
import { AnimatePresence, motion } from "motion/react";

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

export interface WriteFormType {
  game: {
    gameName: string;
    server: string;
    serverNum: string;
  };
  itemType: string;
  accountType: string;
  auctionPeriod: string;
  startingPrice: number;
  allowBuyNow: boolean;
  buyNowPrice: number;
  image: File[];
  title: string;
  description: string;
}

const writeForm: WriteFormType = {
  game: {
    gameName: "",
    server: "",
    serverNum: "",
  },
  itemType: "", // item or account
  accountType: "", // 구글 / 게스트 / 기타 (item 선택 시 비어 있음)
  auctionPeriod: "", // 예: "3일", "5일", "7일" 등
  startingPrice: 0, // 숫자
  allowBuyNow: false, // 즉시 구매 허용 여부
  buyNowPrice: 0, // allowBuyNow가 true일 경우에만 입력
  image: [], // 파일 또는 URL
  title: "",
  description: "",
};

const WriteContent = ({ games }: { games: GameList }) => {
  const form = useForm({
    defaultValues: writeForm,
  });

  const formData = form.watch();

  const onSubmit = (data: typeof writeForm) => {
    console.log(data);
  };

  const formatWithComma = (val: string) => {
    const numeric = val.replace(/,/g, "").replace(/\D/g, "");
    if (!numeric) return "";
    return Number(numeric).toLocaleString();
  };

  const parseToNumber = (val: string) => {
    return val.replace(/,/g, "").replace(/\D/g, "");
  };

  const titleTextStyle = "tracking-[-0.0225rem] text-[1.125rem] text-[18px] ";

  const animationProps = {
    initial: { height: 0, opacity: 0, overflow: "hidden" },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0, padding: 0, margin: 0 },
    transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
  };

  return (
    <FormProvider {...form}>
      <div className="w-full min-h-[calc(100vh-82px)] flex items-center flex-col">
        <div className="flex flex-col gap-[3rem] w-[600px]">
          <h1 className="text-[2.25rem] font-semibold leading-[130%] tracking-[-0.045rem] mt-[140px]">
            경매 등록
          </h1>
          <div className="flex flex-col gap-48">
            <div className="flex flex-col gap-2">
              <p className={titleTextStyle}>게임선택</p>
              <SearchGames games={games} />
            </div>
            {/* 종류선택 */}
            <AnimatePresence>
              {formData.game.gameName && (
                <>
                  <motion.div
                    {...animationProps}
                    className="flex flex-col gap-2"
                  >
                    <p className={titleTextStyle}>종류선택</p>
                    <div className="flex gap-2">
                      {radioArr.map((item, idx) => (
                        <Radio
                          groupName="certificate"
                          listData={item}
                          keyId={item.value + idx}
                          setValue={(value) => form.setValue("itemType", value)}
                          key={item.value + idx}
                          now={formData.itemType}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* 계정 종류 */}
                  {formData.itemType === "account" && (
                    <motion.div
                      {...animationProps}
                      className="flex flex-col gap-2"
                    >
                      <p className={titleTextStyle}>계정 종류</p>
                      <div className="flex gap-2"></div>
                    </motion.div>
                  )}

                  {(formData.itemType === "item" ||
                    (formData.itemType === "account" &&
                      formData.accountType !== "")) && (
                    <>
                      {/* 경매기간 */}
                      <motion.div
                        className="flex flex-col gap-2"
                        {...animationProps}
                      >
                        <p className={titleTextStyle}>경매기간</p>
                        <div className="flex gap-5">
                          {chipArr.map((item, idx) => (
                            <Chip
                              key={item.value + idx}
                              listData={item}
                              selected={formData.auctionPeriod === item.value}
                              onClick={(value) =>
                                form.setValue("auctionPeriod", value)
                              }
                            />
                          ))}
                        </div>
                      </motion.div>
                      {formData.auctionPeriod && (
                        <>
                          {/* 경매시작가 */}
                          <motion.div
                            className="flex flex-col gap-2"
                            {...animationProps}
                          >
                            <p className={titleTextStyle}>경매시작가</p>
                            {/* <CommonInput
                              {...form.register("startingPrice", {
                                required: "경매시작가를 입력해주세요.",
                              })}
                              placeholder="경매시작가를 입력해 주세요."
                            /> */}
                            <div className="flex items-center gap-12">
                              <Controller
                                name="startingPrice"
                                control={form.control}
                                rules={{
                                  required: "경매시작가를 입력해주세요.",
                                }}
                                render={({ field }) => (
                                  <CommonInput
                                    {...field}
                                    value={formatWithComma(`${field.value}`)}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const raw = e.target.value;
                                      field.onChange(parseToNumber(raw)); // 폼 값은 숫자만 유지
                                    }}
                                    placeholder="경매시작가를 입력해 주세요."
                                  />
                                )}
                              />
                              <p className="text-fgGrayPlaceholder text-[20px]">
                                원
                              </p>
                            </div>
                          </motion.div>
                          <AnimatePresence>
                            {formData.allowBuyNow && (
                              <motion.div
                                className="flex flex-col gap-12"
                                {...animationProps}
                              >
                                <p className={titleTextStyle}>즉시 구매가</p>
                                <div className="flex items-center gap-12">
                                  <Controller
                                    name="buyNowPrice"
                                    control={form.control}
                                    rules={{
                                      required: "경매시작가를 입력해주세요.",
                                    }}
                                    render={({ field }) => (
                                      <CommonInput
                                        {...field}
                                        value={formatWithComma(
                                          `${field.value}`
                                        )}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          const raw = e.target.value;
                                          field.onChange(parseToNumber(raw)); // 폼 값은 숫자만 유지
                                        }}
                                        placeholder="경매시작가를 입력해 주세요."
                                      />
                                    )}
                                  />
                                  <p className="text-fgGrayPlaceholder text-[20px]">
                                    원
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="flex items-center gap-12">
                            <Switch
                              on={formData.allowBuyNow}
                              setOn={(value) =>
                                form.setValue("allowBuyNow", value)
                              }
                            />
                            <p>즉시 구매가 사용</p>
                          </div>
                          {formData.startingPrice !== 0 && (
                            <>
                              {/* 상품이미지 */}
                              <motion.div
                                className="flex flex-col gap-2"
                                {...animationProps}
                              >
                                <p className={titleTextStyle}>
                                  상품이미지 (선택)
                                </p>
                                <Dnd
                                  files={formData.image}
                                  setFiles={(updater) => {
                                    if (typeof updater === "function") {
                                      form.setValue(
                                        "image",
                                        updater(formData.image)
                                      );
                                    } else {
                                      form.setValue("image", updater);
                                    }
                                  }}
                                />
                              </motion.div>
                              {/* 작성폼 */}
                              <div className="">
                                <WriteFormContent
                                  title={formData.title}
                                  description={formData.description}
                                  setTitle={(value: string) =>
                                    form.setValue("title", value)
                                  }
                                  setDescription={(value: string) =>
                                    form.setValue("description", value)
                                  }
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="self-end w-[200px]">
            <Button title="경매등록" onClick={form.handleSubmit(onSubmit)} />
          </div>
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WriteContent;
