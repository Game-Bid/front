"use server";

const apiUrl = process.env.NEXT_API_URL;

export interface PostLoginData {
  email: string;
  password: string;
}

export const postLogin = async (formData: PostLoginData) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "로그인 응답 에러");
    }

    const result = await res.text();
    return result;
  } catch (err) {
    console.log("Error details:", err);
    throw err instanceof Error ? err : new Error("알 수 없는 에러");
  }
};
