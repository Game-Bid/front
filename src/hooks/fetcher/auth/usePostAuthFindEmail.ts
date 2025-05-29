import { useMutation } from "@tanstack/react-query";
import { postAuthFindEmail } from "@/services/auth/postAuthFindEmail";
import { showToast } from "@/components/common/Toast";

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
    onError: () => {
      showToast(
        "warning",
        "회원정보를 확인해주세요.",
        "이름, 휴대폰 번호 또는 이메일이 올바르지 않습니다."
      );
    },
  });
};
