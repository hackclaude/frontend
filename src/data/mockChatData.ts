import type { ChatRoom, Message, Participant } from '@/types/chat';

// Mock participants
export const mockParticipants: Record<string, Participant> = {
  seller1: {
    uuid: 'seller-uuid-1',
    name: '판매자1',
    avatar: undefined,
  },
  seller2: {
    uuid: 'seller-uuid-2',
    name: '판매자2',
    avatar: undefined,
  },
  seller3: {
    uuid: 'seller-uuid-3',
    name: '판매자3',
    avatar: undefined,
  },
  currentUser: {
    uuid: 'current-user-uuid',
    name: '나',
    avatar: undefined,
  },
};

// Mock messages
export const mockMessages: Message[] = [
  // Chat room 1 messages
  {
    uuid: 'msg-1-1',
    chatRoomId: 'chat-room-1',
    senderId: 'seller-uuid-1',
    content: '안녕하세요! 상품 문의 주셔서 감사합니다.',
    timestamp: '2025-01-08T10:00:00Z',
    read: true,
  },
  {
    uuid: 'msg-1-2',
    chatRoomId: 'chat-room-1',
    senderId: 'current-user-uuid',
    content: '안녕하세요. 직거래 가능한가요?',
    timestamp: '2025-01-08T10:05:00Z',
    read: true,
  },
  {
    uuid: 'msg-1-3',
    chatRoomId: 'chat-room-1',
    senderId: 'seller-uuid-1',
    content: '네 가능합니다. 어디 지역이신가요?',
    timestamp: '2025-01-08T10:10:00Z',
    read: true,
  },
  {
    uuid: 'msg-1-4',
    chatRoomId: 'chat-room-1',
    senderId: 'current-user-uuid',
    content: '강남역 근처인데 혹시 그쪽 가능하신가요?',
    timestamp: '2025-01-08T10:15:00Z',
    read: true,
  },
  {
    uuid: 'msg-1-5',
    chatRoomId: 'chat-room-1',
    senderId: 'seller-uuid-1',
    content: '네 가능해요! 내일 저녁 7시 어떠세요?',
    timestamp: '2025-01-08T10:20:00Z',
    read: false,
  },

  // Chat room 2 messages
  {
    uuid: 'msg-2-1',
    chatRoomId: 'chat-room-2',
    senderId: 'current-user-uuid',
    content: '상품 상태 어떤가요?',
    timestamp: '2025-01-07T14:00:00Z',
    read: true,
  },
  {
    uuid: 'msg-2-2',
    chatRoomId: 'chat-room-2',
    senderId: 'seller-uuid-2',
    content: '거의 새것이라고 보시면 됩니다. 사용감 거의 없어요.',
    timestamp: '2025-01-07T14:30:00Z',
    read: true,
  },
  {
    uuid: 'msg-2-3',
    chatRoomId: 'chat-room-2',
    senderId: 'current-user-uuid',
    content: '가격 네고 가능할까요?',
    timestamp: '2025-01-07T15:00:00Z',
    read: true,
  },
  {
    uuid: 'msg-2-4',
    chatRoomId: 'chat-room-2',
    senderId: 'seller-uuid-2',
    content: '죄송하지만 가격은 정찰제로 하고 있습니다.',
    timestamp: '2025-01-07T15:30:00Z',
    read: false,
  },

  // Chat room 3 messages
  {
    uuid: 'msg-3-1',
    chatRoomId: 'chat-room-3',
    senderId: 'seller-uuid-3',
    content: '관심 가져주셔서 감사합니다!',
    timestamp: '2025-01-06T09:00:00Z',
    read: true,
  },
  {
    uuid: 'msg-3-2',
    chatRoomId: 'chat-room-3',
    senderId: 'current-user-uuid',
    content: '택배 거래도 가능한가요?',
    timestamp: '2025-01-06T09:30:00Z',
    read: true,
  },
  {
    uuid: 'msg-3-3',
    chatRoomId: 'chat-room-3',
    senderId: 'seller-uuid-3',
    content: '네 택배 거래도 가능합니다. 착불로 보내드릴게요.',
    timestamp: '2025-01-06T10:00:00Z',
    read: false,
  },
];

// Mock chat rooms (using actual product UUIDs from mockData)
export const mockChatRooms: ChatRoom[] = [
  {
    uuid: 'chat-room-1',
    productUuid: '550e8400-e29b-41d4-a716-446655440001', // 아이폰 14 프로
    participants: [mockParticipants.currentUser, mockParticipants.seller1],
    lastMessage: mockMessages.find((m) => m.uuid === 'msg-1-5'),
    unreadCount: 1,
    created_at: '2025-01-08T10:00:00Z',
    updated_at: '2025-01-08T10:20:00Z',
  },
  {
    uuid: 'chat-room-2',
    productUuid: '550e8400-e29b-41d4-a716-446655440002', // 맥북 프로 16인치
    participants: [mockParticipants.currentUser, mockParticipants.seller2],
    lastMessage: mockMessages.find((m) => m.uuid === 'msg-2-4'),
    unreadCount: 1,
    created_at: '2025-01-07T14:00:00Z',
    updated_at: '2025-01-07T15:30:00Z',
  },
  {
    uuid: 'chat-room-3',
    productUuid: '550e8400-e29b-41d4-a716-446655440003', // 에어팟 프로 2세대
    participants: [mockParticipants.currentUser, mockParticipants.seller3],
    lastMessage: mockMessages.find((m) => m.uuid === 'msg-3-3'),
    unreadCount: 1,
    created_at: '2025-01-06T09:00:00Z',
    updated_at: '2025-01-06T10:00:00Z',
  },
];

