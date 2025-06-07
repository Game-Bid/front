"use server";

import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_API_URL;

export const postAuctionsServer = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    console.log(accessToken);

    const res = await fetch(`${apiUrl}/api/v1/auctions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const responseText = await res.text();
    if (!res.ok) {
      throw new Error(responseText || "요청 처리 중 오류가 발생했습니다.");
    }

    return { result: responseText ? JSON.parse(responseText) : null };
  } catch (err) {
    console.log("에러 상세:", err);
    throw err;
  }
};
