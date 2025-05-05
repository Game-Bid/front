"use server";

import { WriteFormData } from "@/_types/write/WriteFormData";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_API_URL;

export const postAuctions = async (formData: WriteFormData) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${apiUrl}/api/v1/auctions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      // api 필드 수정 후 body 수정
    });

    if (!res.ok) {
      return {
        error: "write post Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }

    const result = await res.json();

    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "game API 요청 실패", errorMessage: err };
  }
};
