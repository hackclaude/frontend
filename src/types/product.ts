export type ProductStatus = 'Available' | 'Sold';

export interface Product {
  uuid: string;
  category: string;
  name: string;
  description: string;
  price: number;
  attributes: ProductAttributes | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserProfile {
  uuid: string;
  name: string;
  profileImageUrl?: string;
}

export interface SellerInfo extends UserProfile {
  totalSales?: number;
}

export interface UserInfo extends UserProfile {
  totalPurchases?: number;
  totalLikes?: number;
}

export interface ProductAttributes {
  hasNFT?: boolean;

  thumbnailUrl?: string;
  imageUrls?: string[];
  location?: string;
  liked?: boolean;
  likesCount?: number;

  seller?: SellerInfo;

  [key: string]: unknown;
}
