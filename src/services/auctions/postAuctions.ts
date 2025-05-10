"use server";

import { WriteFormData } from "@/_types/write/WriteFormData";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_API_URL;

export const postAuctions = async (formData: WriteFormData) => {
  console.log(formData);

  const {
    title,
    description,
    startingPrice,
    buyNowPrice,
    endTime,
    accountType,
    game,
  } = formData;

  const postData = {
    title,
    description,
    startingPrice,
    buyNowPrice,
    endTime,
    accountType,
    gmaeId: game.gameName,
    serverId: game.server,
    serverNumId: game.serverNum,
  };

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${apiUrl}/api/v1/auctions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      return {
        error: "write post Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }

    const result = await res.json();

    console.log(result);

    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "game API 요청 실패", errorMessage: err };
  }
};
