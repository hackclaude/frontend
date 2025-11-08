import type { Product } from '@/types/product';
import { getThumbnailUrl } from '@/utils/productUtils';

interface ProductThumbnailProps {
  product: Product;
  className?: string;
}

export default function ProductThumbnail({ product, className = '' }: ProductThumbnailProps) {
  const isSold = product.status === 'Sold';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={getThumbnailUrl(product)}
        alt={product.name}
        className="w-full h-full object-cover"
        style={{
          filter: isSold ? 'brightness(0.6)' : 'none',
        }}
      />
      {isSold && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white bg-gray-900/80 px-2 py-1 rounded">판매완료</span>
        </div>
      )}
    </div>
  );
}
