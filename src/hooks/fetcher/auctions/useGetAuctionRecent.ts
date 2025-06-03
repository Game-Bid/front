// import { getSubscribeAuctionRecent } from "@/services/auctions/detail/getSubscribeAuctionRecent";
// import { useState, useEffect } from "react";

// interface AuctionUpdate {
//   currentPrice: number;

//   bidCount?: number;
//   lastBidTime?: string;
//   auctionId: number;
//   auctionName: string;
//   auctionStatus: string;
//   auctionStartDate: string;
//   auctionEndDate: string;
//   auctionStartTime: string;
// }

// export const useGetSubscribeAuctionRecent = (auctionId: number) => {
//   const [auction, setAuction] = useState<AuctionUpdate | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     console.log(`SSE 연결 시도: auctionId=${auctionId}`);

//     try {
//       const eventSource = getSubscribeAuctionRecent(auctionId);

//       eventSource.onopen = () => {
//         console.log("SSE 연결 성공");
//         setIsConnected(true);
//         setError(null);
//       };

//       eventSource.onmessage = (event: MessageEvent) => {
//         console.log("일반 메시지 수신:", event.data);
//         try {
//           const data = JSON.parse(event.data);
//           setAuction(data);
//         } catch (e) {
//           console.error("메시지 파싱 오류:", e);
//           setError(new Error("메시지 파싱 실패"));
//         }
//       };

//       eventSource.addEventListener("auction-update", (event: MessageEvent) => {
//         console.log("auction-update 이벤트:", event.data);
//         try {
//           const data = JSON.parse(event.data);
//           setAuction(data);
//         } catch (e) {
//           console.error("이벤트 파싱 오류:", e);
//           setError(new Error("이벤트 파싱 실패"));
//         }
//       });

//       eventSource.onerror = (err: Event) => {
//         console.error("SSE 연결 에러:", err);
//         console.error("EventSource readyState:", eventSource.readyState);
//         setIsConnected(false);
//         setError(new Error("SSE 연결 실패"));
//         eventSource.close();
//       };

//       return () => {
//         console.log("SSE 연결 종료");
//         eventSource.close();
//         setIsConnected(false);
//       };
//     } catch (e) {
//       console.error("EventSource 생성 실패:", e);
//       setError(new Error("EventSource 생성 실패"));
//     }
//   }, [auctionId]);

//   return { auction, error, isConnected };
// };

import { getAuctionRecent } from "@/services/auctions/detail/getAuctionRecent";
import { useQuery } from "@tanstack/react-query";

interface AuctionUpdate {
  email: string;
  amount: number;
  updatedAt: string;
}

export const useGetAuctionRecent = (auctionId: number) => {
  return useQuery<AuctionUpdate[]>({
    queryKey: ["auction-recent", auctionId],
    queryFn: () => getAuctionRecent(auctionId),
    enabled: !!auctionId,
    // refetchInterval: 5000, // 5초마다 새로고침 (필요에 따라 조정)
    // refetchOnWindowFocus: true,
  });
};
