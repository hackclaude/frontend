import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Product } from '@/types/product';
import { hasNFT, isLiked } from '@/utils/productUtils';
import NFTBadge from './NFTBadge';
import ProductThumbnail from './ProductThumbnail';

interface HorizontalProductCardProps {
  product: Product;
}

export default function HorizontalProductCard({ product }: HorizontalProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.uuid}`, { viewTransition: true });
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement like functionality
  };

  return (
    <div onClick={handleClick} className="bg-white rounded-lg border border-gray-200 overflow-hidden w-40 shrink-0 cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative">
        <ProductThumbnail product={product} className="w-full h-40" />
        {hasNFT(product) && (
          <div className="absolute top-2 left-2">
            <NFTBadge />
          </div>
        )}
        <button type="button" onClick={handleLikeClick} className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors" aria-label="찜하기">
          <Heart size={18} className={isLiked(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 truncate text-sm">{product.name}</h3>
        <p className="text-violet-600 font-bold mt-1">{product.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
