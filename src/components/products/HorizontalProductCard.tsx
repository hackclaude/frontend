import { Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { hasNFT, getThumbnailColor, isLiked } from '@/utils/productUtils';
import NFTBadge from './NFTBadge';

interface HorizontalProductCardProps {
  product: Product;
}

export default function HorizontalProductCard({ product }: HorizontalProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-[140px] shrink-0">
      <div className="relative">
        <div className="w-full h-[140px]" style={{ backgroundColor: getThumbnailColor(product) }} />
        {hasNFT(product) && (
          <div className="absolute top-2 left-2">
            <NFTBadge />
          </div>
        )}
        <button type="button" className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full" aria-label="찜하기">
          <Heart size={16} className={isLiked(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-gray-900 truncate text-xs">{product.name}</h3>
        <p className="text-violet-600 font-bold mt-1 text-sm">{product.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
