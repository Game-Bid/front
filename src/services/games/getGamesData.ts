"use server";

const apiUrl = process.env.NEXT_API_URL;

export const getGamesData = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/games`);

    if (!res.ok) {
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
