// 인증번호 검증

import { showToast } from "@/components/common/Toast";
import { postVerifyCode } from "@/services/signup/postVerifyCode";
import { useMutation } from "@tanstack/react-query";

export const usePostVerifyCode = () => {
  return useMutation({
    mutationFn: (code:string) => postVerifyCode(code),
        onSuccess: () => {
          showToast("success", "이메일 인증됨", "이메일이 정상적으로 인증되었습니다.");
        },
        onError: () => {
          showToast("warning", "이메일 인증 실패", "이메일이 정상적으로 인증되지 않았습니다.");
        }
  });
};