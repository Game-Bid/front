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
import Dropdown from "../common/Dropdown";
import { WriteFormData } from "@/_types/write/WriteFormData";
import { usePostAuctions } from "@/hooks/fetcher/auctions/usePostAuctions";

const radioArr = [
  { label: "아이템", value: "ITEM" },
  { label: "계정", value: "ACCOUNT" },
];

const accountTypeArr = [
  { label: "구글", value: "google" },
  { label: "게스트", value: "guest" },
  { label: "기타", value: "etc" },
];

const chipArr = [
  { label: "6시간", value: "6h" },
  { label: "12시간", value: "12h" },
  { label: "1일", value: "1d" },
  { label: "3일", value: "3d" },
  { label: "5일", value: "5d" },
  { label: "일주일", value: "7d" },
];

const writeForm: WriteFormData = {
  game: {
    gameName: null,
    server: null,
    serverNum: null,
  },
  itemType: "", // item or account
  accountType: "", // 구글 / 게스트 / 기타 (item 선택 시 비어 있음)
  endTime: "", // 예: "3일", "5일", "7일" 등
  startingPrice: null, // 숫자
  allowBuyNow: false, // 즉시 구매 허용 여부
  buyNowPrice: null, // allowBuyNow가 true일 경우에만 입력
  image: [], // 파일 또는 URL
  title: "",
  description: "",
};

const WriteContent = ({ games }: { games: GameList }) => {
  const form = useForm({
    defaultValues: writeForm,
  });

  const formData = form.watch();
  const { mutate: postAuction } = usePostAuctions();

  const onSubmit = (data: WriteFormData) => {
    // console.log(data);
    // write(data);

    console.log(data);
    postAuction(data);
  };

  const formatWithComma = (val: string) => {
    const numeric = val.replace(/,/g, "").replace(/\D/g, "");
    if (!numeric) return "";
    return Number(numeric).toLocaleString();
  };

  const parseToNumber = (val: string) => {
    return val.replace(/,/g, "").replace(/\D/g, "");
  };

  const titleTextStyle = "tracking-[-0.0225rem] text-1.125 text-[18px] ";

  const animationProps = {
    initial: { height: 0, opacity: 0, overflow: "hidden" },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0, padding: 0, margin: 0 },
    transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
  };

  return (
    <FormProvider {...form}>
      <div className="w-full min-h-[calc(100vh-82px)] flex items-center flex-col">
        <div className="flex flex-col gap-l-3 w-[530px] laptop:w-[422px] tablet:w-screen tablet:px-[24px]">
          <h1 className="text-2.25 font-semibold leading-[1.3] tracking-[-0.045rem] mt-[32px]">
            경매 등록
          </h1>
          <div className="flex flex-col gap-l-3">
            <div className="flex flex-col gap-[4px]">
              <p className={titleTextStyle}>게임선택</p>
              <SearchGames games={games} />
            </div>
            {/* 종류선택 */}
            <AnimatePresence>
              {formData.game.gameName && (
                <>
                  <motion.div
                    {...animationProps}
                    className="flex flex-col gap-[4px]"
                  >
                    <p className={titleTextStyle}>종류선택</p>
                    <div className="flex gap-[16px] tablet:flex-col w-full">
                      {radioArr.map((item, idx) => (
                        <div className="w-full" key={item.value + idx}>
                          <Radio
                            groupName="certificate"
                            listData={item}
                            keyId={item.value + idx}
                            setValue={(value) =>
                              form.setValue("itemType", value)
                            }
                            now={formData.itemType}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 계정 종류 */}
                  {formData.itemType === "ACCOUNT" && (
                    <motion.div
                      {...animationProps}
                      className="flex flex-col gap-[4px] w-full"
                    >
                      <p className={titleTextStyle}>계정 종류</p>
                      <div className="flex gap-[16px] w-full">
                        <Dropdown
                          width="100%"
                          listData={accountTypeArr}
                          placeholder="계정종류를 선택해주세요."
                          select={
                            accountTypeArr.find(
                              (item) => item.value === formData.accountType
                            ) || null
                          }
                          setSelect={(item) =>
                            form.setValue("accountType", item?.value || "")
                          }
                        />
                      </div>
                    </motion.div>
                  )}

                  {(formData.itemType === "ITEM" ||
                    (formData.itemType === "ACCOUNT" &&
                      formData.accountType !== "")) && (
                    <>
                      {/* 경매기간 */}
                      <motion.div
                        className="flex flex-col gap-[4px]"
                        {...animationProps}
                      >
                        <p className={titleTextStyle}>경매기간</p>
                        <div className="flex gap-[8px]">
                          {chipArr.map((item, idx) => (
                            <Chip
                              key={item.value + idx}
                              listData={item}
                              selected={formData.endTime === item.value}
                              onClick={(value) =>
                                form.setValue("endTime", value)
                              }
                            />
                          ))}
                        </div>
                      </motion.div>
                      {formData.endTime && (
                        <>
                          {/* 경매시작가 */}
                          <motion.div
                            className="flex flex-col gap-[4px]"
                            {...animationProps}
                          >
                            <p className={titleTextStyle}>경매시작가</p>
                            <div className="flex items-center gap-0.75">
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
                                      field.onChange(parseToNumber(raw));
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
                                className="flex flex-col gap-[4px]"
                                {...animationProps}
                              >
                                <p className={titleTextStyle}>즉시 구매가</p>
                                <div className="flex items-center gap-0.75">
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
                          <div className="flex items-center gap-[10px]">
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
                                className="flex flex-col gap-[4px]"
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
                              <div>
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
            <Button
              width="200px"
              title="경매등록"
              onClick={form.handleSubmit(onSubmit)}
              disabled={
                formData.game.gameName === null ||
                formData.itemType === "" ||
                formData.endTime === "" ||
                formData.startingPrice === null ||
                formData.title === "" ||
                formData.description === ""
              }
            />
          </div>
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WriteContent;
