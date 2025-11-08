import { Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import NFTBadge from './NFTBadge';

interface GridProductCardProps {
  product: Product;
}

export default function GridProductCard({ product }: GridProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative">
        <div className="w-full aspect-square" style={{ backgroundColor: product.color }} />
        {product.hasNFT && (
          <div className="absolute top-2 left-2">
            <NFTBadge />
          </div>
        )}
        <button type="button" className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full" aria-label="찜하기">
          <Heart size={18} className={product.liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 truncate text-sm">{product.title}</h3>
        <p className="text-violet-600 font-bold mt-1">{product.price.toLocaleString()}원</p>
        <p className="text-xs text-gray-500 mt-1">{product.location}</p>
      </div>
    </div>
  );
}
