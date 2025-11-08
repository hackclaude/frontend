export interface Participant {
  uuid: string;
  name: string;
  avatar?: string;
}

export interface Message {
  uuid: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatRoom {
  uuid: string;
  productUuid: string;
  participants: Participant[];
  lastMessage?: Message;
  unreadCount: number;
  created_at: string;
  updated_at: string;
}
