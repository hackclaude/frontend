import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Heart, MessageCircle, MapPin } from 'lucide-react';
import ImageCarousel from '@/components/products/ImageCarousel';
import SellerInfo from '@/components/products/SellerInfo';
import HorizontalProductCard from '@/components/products/HorizontalProductCard';
import NFTBadge from '@/components/products/NFTBadge';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { mockProducts } from '@/data/mockData';
import { hasNFT } from '@/utils/productUtils';

export default function ProductDetailPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { hideHeader, hideBottomNav } = useLayoutContext();
  const [isLiked, setIsLiked] = useState(false);

  // Find product by UUID
  const product = useMemo(() => {
    return mockProducts.find((p) => p.uuid === uuid);
  }, [uuid]);

  // Check if product UUID is valid
  const isValidProduct = product !== undefined;

  // Redirect to home if invalid product
  useEffect(() => {
    if (!isValidProduct) {
      navigate('/', { replace: true });
      return;
    }
  }, [isValidProduct, navigate]);

  // Hide header and bottom nav when component mounts, show them when unmounts
  useEffect(() => {
    hideHeader(true);
    hideBottomNav(true);
    return () => {
      hideHeader(false);
      hideBottomNav(false);
    };
  }, [hideHeader, hideBottomNav]);

  // Initialize liked state from product data
  useEffect(() => {
    if (product?.attributes?.liked) {
      setIsLiked(true);
    }
  }, [product]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [uuid]);

  // Get seller's other products
  const sellerProducts = useMemo(() => {
    if (!product?.attributes?.seller) return [];
    return mockProducts.filter((p) => p.uuid !== product.uuid && p.attributes?.seller?.uuid === product.attributes?.seller?.uuid).slice(0, 5);
  }, [product]);

  if (!product) {
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleChat = () => {
    // TODO: Implement chat functionality
    console.log('채팅하기');
  };

  const handleViewSellerProfile = () => {
    // TODO: Navigate to seller profile page
    console.log('판매자 프로필 보기');
  };

  const images = product.attributes?.imageUrls || (product.attributes?.thumbnailUrl ? [product.attributes.thumbnailUrl] : []);

  return (
    <div className="-mx-4 -mt-4 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 min-h-16">
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900" aria-label="뒤로 가기">
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={handleToggleLike}
            className={`p-2 rounded-lg transition-colors ${isLiked ? 'text-red-500' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label={isLiked ? '찜하기 취소' : '찜하기'}>
            <Heart size={24} className={isLiked ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <ImageCarousel images={images} alt={product.name} isSold={product.status === 'Sold'} />

      {/* Product Info */}
      <div className="p-4 space-y-4">
        {/* NFT Badge & Title */}
        <div>
          {hasNFT(product) && (
            <div className="mb-2">
              <NFTBadge />
            </div>
          )}
          <h1 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900">{product.price.toLocaleString()}원</span>
            {product.status === 'Sold' && <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">판매완료</span>}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {product.attributes?.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{product.attributes.location}</span>
              </div>
            )}
            {product.attributes?.likesCount !== undefined && <span>찜 {product.attributes.likesCount}개</span>}
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Description */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">상품 설명</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
        </div>

        <div className="border-t border-gray-200" />

        {/* Seller Info */}
        {product.attributes?.seller && <SellerInfo seller={product.attributes.seller} onViewProfile={handleViewSellerProfile} />}

        {/* Seller's Other Products */}
        {sellerProducts.length > 0 && (
          <>
            <div className="border-t border-gray-200" />
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">판매자의 다른 상품</h2>
              <div className="flex gap-3 -mx-4 px-4 overflow-x-auto scrollbar-hide">
                {sellerProducts.map((p) => (
                  <HorizontalProductCard key={p.uuid} product={p} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed Action Buttons */}
      <div className="max-w-[480px] mx-auto fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-colors ${isLiked ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            aria-label={isLiked ? '찜하기 취소' : '찜하기'}>
            <Heart size={24} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button
            type="button"
            onClick={handleChat}
            disabled={product.status === 'Sold'}
            className="flex-1 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            aria-label="판매자에게 채팅하기">
            <MessageCircle size={20} />
            <span>{product.status === 'Sold' ? '판매완료' : '채팅하기'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
