import { Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { hasNFT, getThumbnailUrl, getLocation, isLiked } from '@/utils/productUtils';
import NFTBadge from './NFTBadge';

interface GridProductCardProps {
  product: Product;
}

export default function GridProductCard({ product }: GridProductCardProps) {
  const isSold = product.status === 'Sold';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative">
        <img
          src={getThumbnailUrl(product)}
          alt={product.name}
          className="w-full aspect-square object-cover"
          style={{ opacity: isSold ? 0.5 : 1 }}
        />
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900 bg-white px-3 py-1.5 rounded">판매완료</span>
          </div>
        )}
        {hasNFT(product) && (
          <div className="absolute top-2 left-2">
            <NFTBadge />
          </div>
        )}
        <button type="button" className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full" aria-label="찜하기">
          <Heart size={18} className={isLiked(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 truncate text-sm">{product.name}</h3>
        <p className="text-violet-600 font-bold mt-1">{product.price.toLocaleString()}원</p>
        <p className="text-xs text-gray-500 mt-1">{getLocation(product)}</p>
      </div>
    </div>
  );
}
