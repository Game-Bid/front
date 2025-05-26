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
      showToast("success", "입찰 성공", "입찰이 성공적으로 완료되었습니다.");
    },
    onError: () => {
      showToast("warning", "입찰 실패", "입찰이 실패했습니다.");
    },
  });
};
