import { WriteFormData } from "@/_types/write/WriteFormData";
import { showToast } from "@/components/common/Toast";
import { postAuctions } from "@/services/auctions/write/postAuctions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostAuctions = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: WriteFormData) => postAuctions(formData),
    onSuccess: (data) => {
      console.log(data);
      // if (data.error) {
      //   showToast("warning", "작성 에러가 발생했어요.", data.error);
      //   return;
      // }

      // router.push("/");
      showToast(
        "success",
        "글을 작성했습니다!",
        "성공적으로 글을 작성했습니다!"
      );
      router.push(`/auctions/detail/${data.result.id}`);
    },
    onError: (error) => {
      console.log("Mutation error:", error);
      showToast("warning", "작성 에러가 발생했어요.", "작성에러가 발생했어요.");
    },
  });
};
