"use server";

const apiUrl = process.env.NEXT_API_URL;

interface PostAuthFindEmailProps {
  name: string;
  phoneNumber: string;
}

export const postAuthFindEmail = async (formData: PostAuthFindEmailProps) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/find-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.log(res.statusText);
      return {
        error: "find email Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }
    const result = await res.json();

    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "find email API 요청 실패", errorMessage: err };
  }
};
