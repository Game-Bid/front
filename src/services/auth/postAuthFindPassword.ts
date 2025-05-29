"use server";

const apiUrl = process.env.NEXT_API_URL;

interface postAuthFindPasswordProps {
  email: string;
  name: string;
  phoneNumber: string;
}

export const postAuthFindPassword = async (
  formData: postAuthFindPasswordProps
) => {
  console.log(formData);
  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/find-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.log(res.statusText);
      return {
        error: "find password Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }
    // const result = await res.json();

    // return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "find password API 요청 실패", errorMessage: err };
  }
};
