import { apiClient, type ApiResponse } from '@/lib/api-client';
import type { User } from './auth.service';
import type { Product } from './product.service';

export interface Wallet {
  uuid: string;
  wallet_address: string;
  is_active: boolean;
  user: User;
  created_at: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface NFT {
  uuid: string;
  token_id: string;
  contract_address: string;
  metadata_uri: string;
  metadata: NFTMetadata;
  status: 'ACTIVE' | 'BURNED' | 'TRANSFERRED';
  product: Product;
  warranty?: {
    uuid: string;
    serial_number: string;
    brand_name: string;
  };
  ownership: {
    uuid: string;
    transfer_type: 'MINT' | 'PURCHASE' | 'TRANSFER' | 'GIFT';
    transferred_at: string;
  };
  minted_at?: string;
}

export interface NFTOwnershipHistory {
  uuid: string;
  nft_uuid: string;
  owner_wallet: {
    uuid: string;
    wallet_address: string;
    user: {
      user_id: string;
      name: string;
    };
  };
  previous_owner_wallet?: {
    uuid: string;
    wallet_address: string;
    user: {
      user_id: string;
      name: string;
    };
  };
  transfer_type: 'MINT' | 'PURCHASE' | 'TRANSFER' | 'GIFT';
  status: 'ACTIVE' | 'TRANSFERRED';
  transferred_at: string;
}

export interface MintNFTData {
  product_uuid: string;
  warranty_uuid?: string;
  serial_number: string;
  brand_name: string;
}

export interface TransferNFTData {
  nft_uuid: string;
  to_wallet_uuid: string;
  transfer_type: 'PURCHASE' | 'TRANSFER' | 'GIFT';
  order_uuid?: string;
}

const walletService = {
  // 내 지갑 조회/생성
  getMyWallet: async () => {
    const response = await apiClient.get<ApiResponse<Wallet>>('/wallet/@me');
    return response.data;
  },

  // 보유 NFT 목록 조회
  getMyNFTs: async () => {
    const response = await apiClient.get<ApiResponse<NFT[]>>('/wallet/nfts');
    return response.data;
  },

  // NFT 발행
  mintNFT: async (data: MintNFTData) => {
    const response = await apiClient.post<
      ApiResponse<{
        nft: NFT;
        ownership: NFT['ownership'];
      }>
    >('/wallet/mint', data);
    return response.data;
  },

  // NFT 이전
  transferNFT: async (data: TransferNFTData) => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/wallet/transfer', data);
    return response.data;
  },

  // NFT 소유권 이력 조회
  getNFTHistory: async (nft_uuid: string) => {
    const response = await apiClient.get<ApiResponse<NFTOwnershipHistory[]>>(`/wallet/nft/${nft_uuid}/history`);
    return response.data;
  },
};

export default walletService;
