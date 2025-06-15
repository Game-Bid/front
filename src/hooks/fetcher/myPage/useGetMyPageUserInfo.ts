import {useQuery} from "@tanstack/react-query";
import {getMyPageUserInfo} from "@/services/myPage/getMyPageUserInfo";

export const useGetMyPageUserInfo = () => useQuery({
    queryKey: ['myPage', 'userInfo'],
    queryFn: getMyPageUserInfo,
})