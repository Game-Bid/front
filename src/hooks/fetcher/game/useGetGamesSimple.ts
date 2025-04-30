import { getGamesSimple } from "@/services/games/getGamesSimple";
import { useQuery } from "@tanstack/react-query";

export const useGetGamesSimple = () => {
  return useQuery({
    queryKey: ["gamesSimple"],
    queryFn: getGamesSimple,
    retry: 1,
    staleTime: 1000 * 60 * 5 * 20,
    gcTime: 1000 * 60 * 30 * 20,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
