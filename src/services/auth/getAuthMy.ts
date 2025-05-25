"use server";

const apiUrl = process.env.NEXT_API_URL;
import { cookies } from "next/headers";

export const getAuthMy = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${apiUrl}/api/v1/auth/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log(res.statusText);
      return {
        error: "game Api 응답 에러",
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
