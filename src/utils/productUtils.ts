import type { Product } from '@/types/product';

/**
 * Product에서 NFT 보유 여부 확인
 */
export function hasNFT(product: Product): boolean {
  return product.attributes?.hasNFT === true;
}

/**
 * Product에서 검증된 브랜드 정보 가져오기
 */
export function getVerifiedBrand(product: Product): string | undefined {
  return product.attributes?.verifiedBrand;
}

/**
 * Product에서 썸네일 URL 가져오기
 */
export function getThumbnailUrl(product: Product): string | undefined {
  return product.attributes?.thumbnailUrl;
}

/**
 * Product에서 위치 정보 가져오기
 */
export function getLocation(product: Product): string | undefined {
  return product.attributes?.location;
}

/**
 * Product에서 찜 상태 확인
 */
export function isLiked(product: Product): boolean {
  return product.attributes?.liked === true;
}
