import { getGamesData } from "@/services/games/getGamesData";
import { useQuery } from "@tanstack/react-query";

export const useGetGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: getGamesData,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
