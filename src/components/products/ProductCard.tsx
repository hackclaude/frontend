import { Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { hasNFT, getVerifiedBrand, getThumbnailUrl, getLocation, isLiked } from '@/utils/productUtils';
import NFTBadge from './NFTBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSold = product.status === 'Sold';

  return (
    <div className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200">
      <div className="relative w-20 h-20 rounded-lg shrink-0 overflow-hidden">
        <img
          src={getThumbnailUrl(product)}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ opacity: isSold ? 0.5 : 1 }}
        />
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900 bg-white px-2 py-1 rounded">판매완료</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          {hasNFT(product) && <NFTBadge verifiedBrand={getVerifiedBrand(product)} />}
        </div>
        <p className="text-sm text-gray-500 mt-1">{getLocation(product)}</p>
        <p className="text-violet-600 font-bold mt-1">{product.price.toLocaleString()}원</p>
      </div>
      <button type="button" className="shrink-0" aria-label="찜하기">
        <Heart size={20} className={isLiked(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
      </button>
    </div>
  );
}
