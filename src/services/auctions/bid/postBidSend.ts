"use server";

import { cookies } from "next/headers";

export const postBidSend = async (auctionId: number, bidAmount: number) => {
  const apiUrl = process.env.NEXT_API_URL;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${apiUrl}/api/v1/bid/raise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      auctionId,
      bidAmount,
    }),
  });

  try {
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.error("응답 파싱 실패:", e);
    throw new Error("서버 응답 파싱 중 오류 발생");
  }
};
