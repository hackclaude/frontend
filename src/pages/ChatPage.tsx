import { useNavigate } from 'react-router';
import { mockChatRooms, mockParticipants } from '@/data/mockChatData';
import { getOtherParticipant, getProduct } from '@/utils/chatUtils';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function ChatPage() {
  const navigate = useNavigate();

  const handleChatRoomClick = (productUuid: string) => {
    navigate(`/chat/${productUuid}`);
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: ko });
    } catch {
      return '';
    }
  };

  if (mockChatRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-500">진행 중인 채팅이 없습니다</p>
        <p className="text-sm text-gray-400 mt-2">상품 페이지에서 채팅하기 버튼을 눌러보세요</p>
      </div>
    );
  }

  return (
    <div className="-mx-4 -mt-4">
      <div className="divide-y divide-gray-200">
        {mockChatRooms.map((room) => {
          const otherParticipant = getOtherParticipant(room, mockParticipants.currentUser.uuid);
          const product = getProduct(room.productUuid);

          if (!product) return null;

          return (
            <button key={room.uuid} type="button" onClick={() => handleChatRoomClick(room.productUuid)} className="w-full px-4 py-4 flex gap-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
              {/* Product Image */}
              <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                {product.attributes?.thumbnailUrl ? (
                  <img src={product.attributes.thumbnailUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-xs">No Image</span>
                  </div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                {/* Participant Name and Timestamp */}
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{otherParticipant?.name || '알 수 없음'}</h3>
                  {room.lastMessage && <span className="text-xs text-gray-500 ml-2 shrink-0">{formatTimestamp(room.lastMessage.timestamp)}</span>}
                </div>

                {/* Product Name */}
                <p className="text-xs text-gray-500 mb-1 truncate">{product.name}</p>

                {/* Last Message */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 truncate flex-1">{room.lastMessage?.content || '메시지 없음'}</p>
                  {room.unreadCount > 0 && (
                    <span className="ml-2 shrink-0 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-semibold">{room.unreadCount}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
