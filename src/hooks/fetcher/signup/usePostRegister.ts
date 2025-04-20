import { postRegister } from "@/services/signup/postRegister";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: postRegister,
  });
};