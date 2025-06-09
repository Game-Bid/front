import { getAuctionsIdGames } from "@/services/auctions/getAuctionsIdGames";
import { useQuery } from "@tanstack/react-query";

export const useGetAuctionIdGames = (id: string) => {
  return useQuery({
    queryKey: ["auctionIdGames"],
    queryFn: () => getAuctionsIdGames(id),
  });
};
