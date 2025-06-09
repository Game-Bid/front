"use server";

const apiUrl = process.env.NEXT_API_URL;

export const getAuctionsIdGames = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/auctions/${id}/games`);

    if (!res.ok) {
      return {
        error: "auction id games Api 응답 에러",
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
