"use server";

const apiUrl = process.env.NEXT_API_URL;

interface PostRegisterProps {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  favoriteGame: string;
}

export const postRegister = async (formData: PostRegisterProps) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      return {
        error: "회원가입 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }

    const result = await res.json();
    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "회원가입 실패", errorMessage: err };
  }
};