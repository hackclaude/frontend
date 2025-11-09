import { apiClient, type ApiResponse } from '@/lib/api-client';
import type { Product } from './product.service';
import type { User } from './auth.service';

export type OrderStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'PAYMENT_COMPLETED'
  | 'IN_DELIVERY'
  | 'DELIVERED'
  | 'COMPLETED';

export interface Order {
  uuid: string;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  quantity: number;
  delivery_method: 'direct' | 'parcel';
  delivery_address?: string;
  recipient_name?: string;
  recipient_phone?: string;
  tracking_number?: string;
  buyer_message?: string;
  seller_message?: string;
  buyer: User;
  seller: User;
  product: Product;
  created_at: string;
  updated_at?: string;
}

export interface CreateOrderData {
  product_uuid: string;
  seller_uuid: string;
  quantity: number;
  delivery_method: 'direct' | 'parcel';
  delivery_address?: string;
  recipient_name?: string;
  recipient_phone?: string;
  buyer_message?: string;
}

const orderService = {
  // 주문 생성
  createOrder: async (data: CreateOrderData) => {
    const response = await apiClient.post<ApiResponse<Order>>('/order', data);
    return response.data;
  },

  // 주문 상세 조회
  getOrder: async (uuid: string) => {
    const response = await apiClient.get<ApiResponse<Order>>(`/order/${uuid}`);
    return response.data;
  },

  // 내 구매 내역 조회
  getMyBuyerOrders: async () => {
    const response = await apiClient.get<ApiResponse<Order[]>>('/order/@me/buyer');
    return response.data;
  },

  // 내 판매 내역 조회
  getMySellerOrders: async () => {
    const response = await apiClient.get<ApiResponse<Order[]>>('/order/@me/seller');
    return response.data;
  },

  // 주문 수락 (판매자)
  acceptOrder: async (uuid: string, seller_message?: string) => {
    const response = await apiClient.put<ApiResponse<Order>>(`/order/${uuid}/accept`, { seller_message });
    return response.data;
  },

  // 주문 거절 (판매자)
  rejectOrder: async (uuid: string, seller_message?: string) => {
    const response = await apiClient.put<ApiResponse<Order>>(`/order/${uuid}/reject`, { seller_message });
    return response.data;
  },

  // 주문 취소 (구매자)
  cancelOrder: async (uuid: string) => {
    const response = await apiClient.put<ApiResponse<Order>>(`/order/${uuid}/cancel`);
    return response.data;
  },

  // 배송 시작 (판매자)
  shipOrder: async (uuid: string, tracking_number: string) => {
    const response = await apiClient.put<ApiResponse<Order>>(`/order/${uuid}/ship`, { tracking_number });
    return response.data;
  },

  // 배송 완료 확인 (구매자)
  deliveredOrder: async (uuid: string) => {
    const response = await apiClient.put<ApiResponse<Order>>(`/order/${uuid}/delivered`);
    return response.data;
  },

  // 거래 완료 (구매자)
  completeOrder: async (uuid: string) => {
    const response = await apiClient.put<ApiResponse<Order>>(`/order/${uuid}/complete`);
    return response.data;
  },
};

export default orderService;
