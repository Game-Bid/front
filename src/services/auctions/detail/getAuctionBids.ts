"use server";

export const getAuctionBids = async (auctionId: number) => {
  const apiUrl = process.env.NEXT_API_URL;
  const url = `${apiUrl}/api/v1/auctions/${auctionId}/bids`;

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};
