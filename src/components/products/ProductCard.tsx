import { Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { hasNFT, getVerifiedBrand, getThumbnailColor, getLocation, isLiked } from '@/utils/productUtils';
import NFTBadge from './NFTBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200">
      <div className="w-20 h-20 rounded-lg shrink-0" style={{ backgroundColor: getThumbnailColor(product) }} />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
        {hasNFT(product) && (
          <div className="mt-1">
            <NFTBadge verifiedBrand={getVerifiedBrand(product)} />
          </div>
        )}
        <p className="text-sm text-gray-500 mt-1">{getLocation(product)}</p>
        <p className="text-violet-600 font-bold mt-1">{product.price.toLocaleString()}원</p>
      </div>
      <button type="button" className="shrink-0" aria-label="찜하기">
        <Heart size={20} className={isLiked(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
      </button>
    </div>
  );
}
