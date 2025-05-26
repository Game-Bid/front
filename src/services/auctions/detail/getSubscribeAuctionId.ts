"use client";

export const getSubscribeAuctionId = (auctionId: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/v1/auction/subscribe/${auctionId}`;

  return new EventSource(url, { withCredentials: true });
};
