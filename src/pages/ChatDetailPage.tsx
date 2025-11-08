import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { mockParticipants } from '@/data/mockChatData';
import { getChatRoomByProductUuid, getChatRoomMessages, getOtherParticipant, getProduct } from '@/utils/chatUtils';
import type { Message } from '@/types/chat';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import { useLayoutContext } from '@/hooks/useLayoutContext';

export default function ChatDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { hideHeader, hideBottomNav } = useLayoutContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const chatRoom = uuid ? getChatRoomByProductUuid(uuid) : undefined;
  const product = uuid ? getProduct(uuid) : undefined;
  const otherParticipant = chatRoom ? getOtherParticipant(chatRoom, mockParticipants.currentUser.uuid) : undefined;

  // Hide header and bottom nav
  useEffect(() => {
    hideHeader(true);
    hideBottomNav(true);
    return () => {
      hideHeader(false);
      hideBottomNav(false);
    };
  }, [hideHeader, hideBottomNav]);

  // Load messages
  useEffect(() => {
    if (!chatRoom) return;
    const chatMessages = getChatRoomMessages(chatRoom.uuid);
    setMessages(chatMessages);
  }, [chatRoom]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendMessage = (content: string) => {
    if (!chatRoom) return;

    const newMessage: Message = {
      uuid: `msg-${Date.now()}`,
      chatRoomId: chatRoom.uuid,
      senderId: mockParticipants.currentUser.uuid,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  if (!chatRoom || !otherParticipant || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500">채팅방을 찾을 수 없습니다</p>
        <button type="button" onClick={handleBack} className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="-mx-4 -mt-4 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900" aria-label="뒤로 가기">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-900 truncate">{otherParticipant.name}</h1>
            <p className="text-xs text-gray-500 truncate">{product.name}</p>
          </div>
        </div>
      </div>

      {/* Product Info Card */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-3">
          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
            {product.attributes?.thumbnailUrl ? (
              <img src={product.attributes.thumbnailUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/product/${product.uuid}`)}>
            <p className="text-sm text-gray-900 truncate">{product.name}</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{product.price.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500">메시지가 없습니다</p>
            <p className="text-sm text-gray-400 mt-2">첫 메시지를 보내보세요</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.uuid} message={message} isOwn={message.senderId === mockParticipants.currentUser.uuid} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
