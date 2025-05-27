import React, { useState } from "react";
import Button from "@/components/common/Button";
import { usePostBidSend } from "@/hooks/fetcher/auctions/bid/usePostBidSend";
import Confirm from "@/components/common/Confirm";
import Alert from "@/components/common/Alert";

const BidButton = ({
  bidAmount,
  auctionId,
}: {
  bidAmount: number;
  auctionId: number;
}) => {
  const bidMutation = usePostBidSend({ auctionId, bidAmount });
  const [confirmModal, setConfirmModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const handleBid = () => {
    bidMutation.mutate();
    setConfirmModal(false);
    setAlertModal(true);
  };

  return (
    <div>
      <Button
        title="입찰하기"
        width="100%"
        onClick={() => setConfirmModal(true)}
      />
      <Confirm
        isOpen={confirmModal}
        falseSubmit={() => setConfirmModal(false)}
        trueSubmit={handleBid}
        title={
          <div className="flex-center flex-col">
            <p className="text-fgPrimaryAccent">
              {bidAmount.toLocaleString()}원
            </p>
            정말 입찰하시겠습니까?
          </div>
        }
        description={
          <p className="text-justify">
            입찰이 확정되면 취소할 수 없으며, 낙찰 시 결제가 반드시 필요합니다.
            결제를 하지 않을 경우 패널티가 부여됩니다. 신중하게 입찰해 주세요.
          </p>
        }
        icon
        customIcon="TARGET-02"
      />
      <Alert
        isOpen={alertModal}
        onSumbit={() => setAlertModal(false)}
        title="입찰성공!"
        description={
          <div className="text-center">
            다른 참가자들과 경쟁 중입니다. <br />
            최종 낙찰 여부는 경매 종료 후 확인할 수 있습니다.
          </div>
        }
        icon
        customIcon="CHECK-CONTAINED2"
      />
    </div>
  );
};

export default BidButton;
