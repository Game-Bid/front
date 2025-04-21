import { showToast } from "@/components/common/Toast";
import { postRegister, PostRegisterProps } from "@/services/signup/postRegister";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: PostRegisterProps) => postRegister(formData),
    onSuccess: () => {
      showToast("success", "회원가입 완료", "회원가입이 완료되었습니다.");
      router.push("/login");
    },
    onError: () => {
      showToast("warning", "회원가입 실패", "회원가입에 실패했습니다.");
    }
  });
};