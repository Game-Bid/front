import { getSubscribeAuctionId } from "@/services/auctions/detail/getSubscribeAuctionId";
import { useState, useEffect } from "react";

export interface Bids {
  email: string;
  amount: number;
  updatedAt: string;
}

export interface AuctionUpdate {
  currentPrice: number;
  bidCount: number;
  bids: Bids[];
  status: string;
}

export const useGetSubscribeAuctionId = (auctionId: number) => {
  const [auction, setAuction] = useState<AuctionUpdate | null>(null);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    const eventSource = getSubscribeAuctionId(auctionId);

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        setAuction(data);
      } catch (e) {
        console.error("메시지 파싱 오류:", e);
      }
    };

    eventSource.addEventListener("auction-update", (event: MessageEvent) => {
      console.log("auction-update 이벤트:", event.data);
      try {
        const data = JSON.parse(event.data);
        setAuction(data);
      } catch (e) {
        console.error("이벤트 파싱 오류:", e);
      }
    });

    eventSource.onerror = (err: Event) => {
      console.error("SSE 연결 에러:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [auctionId]);

  return { auction, error };
};
