export interface WriteFormData {
  game: {
    gameName: number | null;
    server: number | null;
    serverNum: number | null;
  };
  itemType: "ITEM" | "ACCOUNT" | string;
  accountType: string;
  endTime: string;
  startingPrice: number | null;
  allowBuyNow: boolean;
  buyNowPrice: number | null;
  image: File[];
  title: string;
  description: string;
}
