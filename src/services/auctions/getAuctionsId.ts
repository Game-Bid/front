"use server";

const apiUrl = process.env.NEXT_API_URL;

export const getAuctionsId = async (id: string) => {
  console.log(`${apiUrl}/api/v1/auctions/${id}?increment=false`);
  try {
    const res = await fetch(`${apiUrl}/api/v1/auctions/${id}?increment=true`);

    if (!res.ok) {
      return {
        error: "auction id Api 응답 에러",
        status: res.status,
        statusText: res.statusText,
      };
    }
    const result = await res.json();

    console.log(result);

    return { result };
  } catch (err) {
    console.log("Error details:", err);
    return { error: "game API 요청 실패", errorMessage: err };
  }
};
