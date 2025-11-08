import { ChevronRight } from 'lucide-react';
import type { SellerInfo as SellerInfoType } from '@/types/product';

interface SellerInfoProps {
  seller: SellerInfoType;
  onViewProfile?: () => void;
}

export default function SellerInfo({ seller, onViewProfile }: SellerInfoProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">판매자 정보</h3>

      <button type="button" onClick={onViewProfile} className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
        {/* Profile Image */}
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {seller.profileImageUrl ? <img src={seller.profileImageUrl} alt={seller.name} className="w-full h-full object-cover" /> : <span className="text-violet-600 font-semibold text-lg">{seller.name.charAt(0)}</span>}
        </div>

        {/* Seller Details */}
        <div className="flex-1 text-left">
          <span className="font-semibold text-gray-900 block mb-1">{seller.name}</span>
          {seller.totalSales !== undefined && <p className="text-sm text-gray-500">판매 {seller.totalSales}건</p>}
        </div>

        {/* Arrow */}
        <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
      </button>
    </div>
  );
}
