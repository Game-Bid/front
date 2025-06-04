import { useMutation } from "@tanstack/react-query";
import { postAuthFindPassword } from "@/services/auth/postAuthFindPassword";
import { showToast } from "@/components/common/Toast";

interface usePostAuthFindPasswordProps {
  onSuccess: () => void;
}

export const usePostAuthFindPassword = ({
  onSuccess,
}: usePostAuthFindPasswordProps) => {
  return useMutation({
    mutationFn: postAuthFindPassword,
    onSuccess: () => {
      onSuccess();
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
