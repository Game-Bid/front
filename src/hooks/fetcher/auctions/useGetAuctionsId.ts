import { getAuctionsId } from "@/services/auctions/getAuctionsId";
import { useQuery } from "@tanstack/react-query";

export const useGetAuctionsId = (id: string) => {
  return useQuery({
    queryKey: ["auctionId"],
    queryFn: () => getAuctionsId(id),
  });
};
