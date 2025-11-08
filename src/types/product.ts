export enum ProductStatus {
  Available = 'Available',
  OutOfStock = 'OutOfStock',
  Discontinued = 'Discontinued',
}

// Backend Product entity (matches TypeORM schema)
export interface Product {
  id: number;
  uuid: string;
  group: string;
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

// Product attributes stored in JSONB field
export interface ProductAttributes {
  // NFT related
  hasNFT?: boolean;
  verifiedBrand?: string;
  nftTokenId?: string;
  blockchainNetwork?: string;

  // UI related (will be stored in backend too)
  thumbnailColor?: string;
  location?: string;
  liked?: boolean;

  // Other flexible attributes
  [key: string]: unknown;
}
