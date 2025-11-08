import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Grid3x3, List, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import GridProductCard from '@/components/products/GridProductCard';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { mockProducts } from '@/data/mockData';
import { isLiked } from '@/utils/productUtils';

type LayoutMode = 'grid' | 'list';
type SortOption = 'latest' | 'price-low' | 'price-high';

const CATEGORY_LABELS: Record<string, string> = {
  'ai-recommend': 'AI 기반 맞춤 추천',
  'nft-verified': 'NFT 정품 인증',
  recent: '최근 본 상품',
  liked: '찜한 상품',
};

const SORT_LABELS: Record<SortOption, string> = {
  latest: '최신순',
  'price-low': '가격 낮은순',
  'price-high': '가격 높은순',
};

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { hideHeader, hideBottomNav } = useLayoutContext();
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categoryLabel = categoryId ? CATEGORY_LABELS[categoryId] : '카테고리';

  // Check if categoryId is valid
  const isValidCategory = categoryId && categoryId in CATEGORY_LABELS;

  // Redirect to home if invalid category
  useEffect(() => {
    if (!isValidCategory) {
      navigate('/', { replace: true });
      return;
    }
  }, [isValidCategory, navigate]);

  // Hide header and bottom nav when component mounts, show them when unmounts
  useEffect(() => {
    hideHeader(true);
    hideBottomNav(true);
    return () => {
      hideHeader(false);
      hideBottomNav(false);
    };
  }, [hideHeader, hideBottomNav]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!isValidCategory) {
      return [];
    }

    let products = [...mockProducts];

    // Filter based on categoryId
    if (categoryId === 'nft-verified') {
      products = products.filter((p) => p.attributes?.hasNFT === true);
    } else if (categoryId === 'liked') {
      products = products.filter((p) => isLiked(p));
    }
    // For 'ai-recommend', 'recent', and other categories, show all products (default behavior)

    return products;
  }, [categoryId, isValidCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortOption) {
      case 'latest':
        return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }, [filteredProducts, sortOption]);

  const handleBack = () => {
    navigate('/');
  };

  const toggleLayout = () => {
    setLayoutMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  return (
    <div className="-mx-4 -mt-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900" aria-label="뒤로 가기">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-900">{categoryLabel}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Layout Toggle */}
            <button type="button" onClick={toggleLayout} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label={layoutMode === 'grid' ? '리스트 보기' : '그리드 보기'}>
              {layoutMode === 'grid' ? <List size={20} className="text-gray-600" /> : <Grid3x3 size={20} className="text-gray-600" />}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                {SORT_LABELS[sortOption]}
                <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showSortDropdown && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSortChange(option)}
                        className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors ${sortOption === option ? 'text-violet-600 font-semibold bg-violet-50' : 'text-gray-700'}`}>
                        {SORT_LABELS[option]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="p-4">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">상품이 없습니다</p>
          </div>
        ) : layoutMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {sortedProducts.map((product) => (
              <GridProductCard key={product.uuid} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
