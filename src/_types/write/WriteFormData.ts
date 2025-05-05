export interface WriteFormData {
  game: {
    gameName: string;
    server: string;
    serverNum: string;
  };
  itemType: string;
  accountType: string;
  auctionPeriod: string;
  startingPrice: number | null;
  allowBuyNow: boolean;
  buyNowPrice: number | null;
  image: File[];
  title: string;
  description: string;
}
