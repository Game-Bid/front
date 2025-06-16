import {useMutation} from "@tanstack/react-query";
import {MyPageUserInfoRequest, postMyPageUserInfo} from "@/services/myPage/postMyPageUserInfo";
import {showToast} from "@/components/common/Toast";

export const usePostMyPageUserInfo = () => useMutation({
    mutationFn: (formData: MyPageUserInfoRequest) => postMyPageUserInfo(formData),
    onSuccess: () =>
        showToast(
            "success", "회원정보 수정 성공", ""
        ),
    onError: () =>
        showToast("warning", "회원정보 수정 실패", "")
})