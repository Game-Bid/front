// hooks/useBidMutation.ts
import { showToast } from "@/components/common/Toast";
import { postBidSend } from "@/services/auctions/bid/postBidSend";
import { useMutation } from "@tanstack/react-query";

interface BidInType {
  auctionId: number;
  bidAmount: number;
}

export const usePostBidSend = ({ auctionId, bidAmount }: BidInType) => {
  return useMutation({
    mutationFn: () => postBidSend(auctionId, bidAmount),
    onSuccess: () => {
      showToast(
        "success",
        "입찰 성공!",
        "최종 낙찰여부는 경매 종료후 확인할 수 있습니다. "
      );
    },
    onError: () => {
      showToast("warning", "입찰 실패!", "서버오류로 입찰이 실패했습니다.");
    },
  });
};
