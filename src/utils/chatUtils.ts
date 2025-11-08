import type { ChatRoom, Participant } from '@/types/chat';
import type { Product } from '@/types/product';
import { mockChatRooms, mockMessages } from '@/data/mockChatData';
import { mockProducts } from '@/data/mockData';

export function getChatRoomMessages(chatRoomId: string) {
  return mockMessages.filter((msg) => msg.chatRoomId === chatRoomId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export function getChatRoom(chatRoomId: string): ChatRoom | undefined {
  return mockChatRooms.find((room) => room.uuid === chatRoomId);
}

export function getChatRoomByProductUuid(productUuid: string): ChatRoom | undefined {
  return mockChatRooms.find((room) => room.productUuid === productUuid);
}

export function getProduct(productUuid: string): Product | undefined {
  return mockProducts.find((product) => product.uuid === productUuid);
}

export function getOtherParticipant(chatRoom: ChatRoom, currentUserId: string): Participant | undefined {
  return chatRoom.participants.find((p) => p.uuid !== currentUserId);
}
