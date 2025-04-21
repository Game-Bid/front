import { showToast } from "@/components/common/Toast";

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

    const contentType = res.headers.get("content-type");

    if (res.status === 500) {
      showToast("warning", "이미 가입된 계정입니다.", "");
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "인증번호 요청 실패");
      }
      return data;
    } else {
      const text = await res.text();
      if (!res.ok || text !== "인증번호 요청이 완료되었습니다.") {
        throw new Error(text || "인증번호 요청 실패");
      }
      return { success: true, message: text };
    }
  } catch (err) {
    console.error("Error in postVerifyRequest:", err);
    throw err instanceof Error ? err : new Error("알 수 없는 에러");
  }
};