export interface AuctionItem {
  id: number;
  auctionCode: string;
  auctionType: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  buyNowPrice: number;
  startTime: string;
  endTime: string;
  status: "PENDING" | "ACTIVE" | "ENDED";
  views: number;
  bidCount: number;
  images: {
    id: number;
    imageUrl: string;
    displayOrder: number;
  }[];
  createdAt: string;
  updatedAt: string;
  gameId: number;
  gameName: string;
  gameIconUrl: string;
  serverId: number;
  serverName: string;
  serverNumId: number;
  serverNumName: string;
  highlighted: boolean;
  extended: boolean;
}
