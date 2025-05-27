import { useMutation } from "@tanstack/react-query";
import { postAuthFindEmail } from "@/services/auth/postAuthFindEmail";

interface PostAuthFindEmailProps {
  onSuccess: (data: { email: string }) => void;
}

export const usePostAuthFindEmail = ({ onSuccess }: PostAuthFindEmailProps) => {
  return useMutation({
    mutationFn: postAuthFindEmail,
    onSuccess: (data) => {
      onSuccess({
        email: data.result.email,
      });
    },
  });
};
