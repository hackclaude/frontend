import { apiClient, type ApiResponse } from '@/lib/api-client';
import type { Product as ProductType, ProductAttributes } from '@/types/product';

// API에서 받는 Product 타입 (백엔드 응답)
export interface ProductResponse {
  uuid: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'Available' | 'Sold';
  has_nft: boolean;
  attributes?: {
    thumbnailUrl?: string;
    imageUrls?: string[];
    verifiedBrand?: string;
    [key: string]: unknown;
  };
  seller: {
    uuid: string;
    user_id: string;
    name: string;
  };
  product_state?: {
    views: number;
    likes: number;
  };
  created_at: string;
  updated_at?: string;
  last_viewed_at?: string;
}

// 프론트엔드에서 사용하는 Product 타입 (기존 타입과 호환)
export interface Product extends ProductType {
  has_nft?: boolean;
  seller?: {
    uuid: string;
    user_id: string;
    name: string;
  };
  product_state?: {
    views: number;
    likes: number;
  };
  last_viewed_at?: string;
}

// API 응답을 프론트엔드 타입으로 변환
function mapProductResponse(response: ProductResponse): Product {
  return {
    uuid: response.uuid,
    name: response.name,
    description: response.description,
    price: response.price,
    category: response.category,
    status: response.status,
    has_nft: response.has_nft,
    attributes: {
      ...response.attributes,
      hasNFT: response.has_nft,
      seller: response.seller
        ? {
            uuid: response.seller.uuid,
            name: response.seller.name,
          }
        : undefined,
      likesCount: response.product_state?.likes,
    } as ProductAttributes,
    seller: response.seller,
    product_state: response.product_state,
    created_at: response.created_at,
    updated_at: response.updated_at || response.created_at,
    deleted_at: null,
    last_viewed_at: response.last_viewed_at,
  };
}

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  category?: string;
  status?: 'Available' | 'Sold';
  has_nft?: boolean;
  page?: number;
  limit?: number;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  attributes?: {
    thumbnailUrl?: string;
    imageUrls?: string[];
    verifiedBrand?: string;
    [key: string]: unknown;
  };
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  attributes?: Record<string, unknown>;
}

const productService = {
  // 상품 목록 조회
  getProducts: async (filters?: ProductFilters): Promise<ApiResponse<ProductListResponse>> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.has_nft !== undefined) params.append('has_nft', String(filters.has_nft));
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.limit) params.append('limit', String(filters.limit));

    const response = await apiClient.get<
      ApiResponse<{
        products: ProductResponse[];
        pagination: ProductListResponse['pagination'];
      }>
    >(`/product?${params.toString()}`);

    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: {
          products: response.data.data.products.map(mapProductResponse),
          pagination: response.data.data.pagination,
        },
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: response.data.error,
    };
  },

  // 상품 상세 조회
  getProduct: async (uuid: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<ApiResponse<ProductResponse>>(`/product/${uuid}`);
    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: mapProductResponse(response.data.data),
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: response.data.error,
    };
  },

  // 상품 등록
  createProduct: async (data: CreateProductData): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post<ApiResponse<ProductResponse>>('/product', data);
    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: mapProductResponse(response.data.data),
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: response.data.error,
    };
  },

  // 상품 수정
  updateProduct: async (uuid: string, data: UpdateProductData): Promise<ApiResponse<Product>> => {
    const response = await apiClient.put<ApiResponse<ProductResponse>>(`/product/${uuid}`, data);
    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: mapProductResponse(response.data.data),
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: response.data.error,
    };
  },

  // 상품 삭제
  deleteProduct: async (uuid: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/product/${uuid}`);
    return response.data;
  },

  // 내 상품 목록 조회
  getMyProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await apiClient.get<ApiResponse<ProductResponse[]>>('/product/@me/list');
    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: response.data.data.map(mapProductResponse),
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: response.data.error,
    };
  },

  // 최근 본 상품 조회
  getRecentProducts: async (limit = 20): Promise<ApiResponse<Product[]>> => {
    const response = await apiClient.get<ApiResponse<ProductResponse[]>>(`/product/@me/recent?limit=${limit}`);
    if (response.data.success && response.data.data) {
      return {
        success: true,
        data: response.data.data.map(mapProductResponse),
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: response.data.error,
    };
  },
};

export default productService;
