"use client";

import { WriteFormData } from "@/_types/write/WriteFormData";
import { postAuctionsServer } from "./postAuctionsServer";

export const postAuctions = async (formData: WriteFormData) => {
  const form = new FormData();
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("startingPrice", formData.startingPrice?.toString() || "");
  form.append("buyNowPrice", formData.buyNowPrice?.toString() || "");
  form.append("auctionType", formData.itemType);
  form.append("gameId", formData.game?.gameName?.toString() || "");
  form.append("serverId", formData.game.server?.toString() || "");
  form.append("serverNumId", formData.game.serverNum?.toString() || "");
  form.append("duration", formData.endTime);

  // 이미지 처리
  if (formData.image.length > 0) {
    formData.image.forEach((img: File) => {
      form.append("images", img, img.name); // img.name 제거
    });
  }

  console.log("이미지 확인:", formData.image);
  console.log("FormData 전체 확인:");
  for (const [key, value] of form.entries()) {
    console.log(key, value);
  }

  return postAuctionsServer(form);
};
