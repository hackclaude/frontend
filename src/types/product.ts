export interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  liked: boolean;
  color: string;
  hasNFT?: boolean; // NFT 정품인증서 보유 여부
  verifiedBrand?: string; // 인증된 브랜드
}
