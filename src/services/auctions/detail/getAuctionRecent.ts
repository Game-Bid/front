// "use client";

// export const getSubscribeAuctionRecent = (auctionId: number) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const url = `${apiUrl}/api/v1/auctions/${auctionId}/bids/recent`;

//   return new EventSource(url, { withCredentials: true });
// };

"use client";

export const getAuctionRecent = async (auctionId: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/v1/auctions/${auctionId}/bids/recent`;

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
