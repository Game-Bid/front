const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const postVerifyCode = async (email: string, code: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "인증 실패");
      }
      return data;
    } else {
      const text = await res.text();
      if (!res.ok || text !== "인증이 완료되었습니다.") {
        throw new Error(text || "인증 실패");
      }
      return { success: true, message: text };
    }
  } catch (err) {
    console.error("Error in postVerifyCode:", err);
    throw err instanceof Error ? err : new Error("알 수 없는 에러");
  }
};