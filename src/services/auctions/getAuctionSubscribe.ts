"use client";

// import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAuctionsSubscribe = async (id: string) => {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${apiUrl}/api/v1/auction/subscribe/${id}`, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        error: "auction subscribe Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }

    console.log(res.body);

    return { stream: res.body };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "auction subscribe API 요청 실패", errorMessage: err };
  }
};
