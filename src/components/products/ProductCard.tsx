import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Product } from '@/types/product';
import { hasNFT, getLocation, isLiked } from '@/utils/productUtils';
import NFTBadge from './NFTBadge';
import ProductThumbnail from './ProductThumbnail';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.uuid}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement like functionality
  };

  return (
    <div onClick={handleClick} className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
      <ProductThumbnail product={product} className="w-20 h-20 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          {hasNFT(product) && <NFTBadge />}
        </div>
        <p className="text-sm text-gray-500 mt-1">{getLocation(product)}</p>
        <p className="text-violet-600 font-bold mt-1">{product.price.toLocaleString()}원</p>
      </div>
      <button type="button" onClick={handleLikeClick} className="shrink-0 pr-1" aria-label="찜하기">
        <Heart size={20} className={isLiked(product) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
      </button>
    </div>
  );
}
