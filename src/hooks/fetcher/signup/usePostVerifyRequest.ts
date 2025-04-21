// 인증번호 요청

import { showToast } from "@/components/common/Toast";
import { postVerifyRequest } from "@/services/signup/postVerifyRequest";
import { useMutation } from "@tanstack/react-query";

export const usePostVerifyRequest = () => {
  return useMutation({
    mutationFn: (email: string) => postVerifyRequest(email),
    onSuccess: () => {
      showToast("success", "인증번호가 전송되었습니다.", "");
    },
  });
};