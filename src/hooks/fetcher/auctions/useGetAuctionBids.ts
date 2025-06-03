import { getAuctionBids } from "@/services/auctions/detail/getAuctionBids";
import { useQuery } from "@tanstack/react-query";

interface AuctionUpdate {
  email: string;
  amount: number;
  updatedAt: string;
}

export const useGetAuctionBids = (
  auctionId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery<AuctionUpdate[]>({
    queryKey: ["auction-recent", auctionId],
    queryFn: () => getAuctionBids(auctionId),
    enabled: !!auctionId && (options?.enabled ?? true),
  });
};
