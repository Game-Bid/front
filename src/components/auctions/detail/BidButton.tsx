import Button from "@/components/common/Button";
import { usePostBidSend } from "@/hooks/fetcher/auctions/bid/usePostBidSend";

import React from "react";

const BidButton = ({
  bidAmount,
  auctionId,
}: {
  bidAmount: number;
  auctionId: number;
}) => {
  const bidMutation = usePostBidSend({ auctionId, bidAmount });

  const handleBid = () => {
    bidMutation.mutate();
  };
  return (
    <div>
      <Button title="입찰하기" width="100%" onClick={handleBid} />
    </div>
  );
};

export default BidButton;
