"use server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const postVerifyRequest = async (email: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/verify-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return {
        error: "인증번호 요청 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }

    const result = await res.json();
    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "인증번호 요청 실패", errorMessage: err };
  }
};