"use server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const postVerifyCode = async (code: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });

    if (!res.ok) {
      return {
        error: "인증번호 인증 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }

    const result = await res.json();
    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "인증번호 인증 실패", errorMessage: err };
  }
};