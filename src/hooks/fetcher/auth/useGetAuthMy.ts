import { useQuery } from "@tanstack/react-query";
import { getAuthMy } from "@/services/auth/getAuthMy";

export const useGetAuthMy = () => {
  return useQuery({
    queryKey: ["auth", "my"],
    queryFn: getAuthMy,
  });
};
