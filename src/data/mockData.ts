import type { Product } from '@/types/product';

export const mockProducts: Product[] = [
  { id: 1, title: '아이폰 14 프로', price: 950000, location: '강남구', liked: false, color: '#A78BFA', hasNFT: true, verifiedBrand: 'Apple' },
  { id: 2, title: '맥북 프로 16인치', price: 2500000, location: '서초구', liked: true, color: '#818CF8', hasNFT: true, verifiedBrand: 'Apple' },
  { id: 3, title: '에어팟 프로 2세대', price: 180000, location: '송파구', liked: false, color: '#C084FC', hasNFT: false },
  { id: 4, title: '갤럭시 탭 S9', price: 650000, location: '강남구', liked: false, color: '#A855F7', hasNFT: true, verifiedBrand: 'Samsung' },
  { id: 5, title: '아이패드 에어', price: 850000, location: '마포구', liked: false, color: '#D8B4FE', hasNFT: true, verifiedBrand: 'Apple' },
  { id: 6, title: '삼성 모니터 32인치', price: 320000, location: '강남구', liked: true, color: '#C084FC', hasNFT: false },
];

export const categorySections = [
  { id: 'ai-recommend', label: 'AI 추천' },
  { id: 'nft-verified', label: 'NFT 인증' },
  { id: 'recent', label: '최근 본 상품' },
  { id: 'liked', label: '찜한 상품' },
];
