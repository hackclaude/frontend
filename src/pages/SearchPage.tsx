import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ChevronLeft, Search, X, Grid3x3, List, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import GridProductCard from '@/components/products/GridProductCard';
import { useLayoutContext } from '@/hooks/useLayoutContext';
import { mockProducts } from '@/data/mockData';
import { getSearchHistory, addSearchHistory, removeSearchHistory, clearSearchHistory } from '@/utils/searchHistory';

type LayoutMode = 'grid' | 'list';
type SortOption = 'latest' | 'price-low' | 'price-high';

const SORT_LABELS: Record<SortOption, string> = {
  latest: '최신순',
  'price-low': '가격 낮은순',
  'price-high': '가격 높은순',
};

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'smartphone', label: '스마트폰' },
  { id: 'laptop', label: '노트북' },
  { id: 'tablet', label: '태블릿' },
  { id: 'audio', label: '오디오' },
  { id: 'monitor', label: '모니터' },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hideHeader, hideBottomNav } = useLayoutContext();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [nftOnly, setNftOnly] = useState(false);

  // Hide header and bottom nav
  useEffect(() => {
    hideHeader(true);
    hideBottomNav(true);
    return () => {
      hideHeader(false);
      hideBottomNav(false);
    };
  }, [hideHeader, hideBottomNav]);

  // Load search history
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  // Sync search input with URL query parameter
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    addSearchHistory(searchQuery);
    setSearchHistory(getSearchHistory());
    setSearchParams({ q: searchQuery });
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    addSearchHistory(query);
    setSearchHistory(getSearchHistory());
    setSearchParams({ q: query });
  };

  const handleRemoveHistory = (query: string) => {
    removeSearchHistory(query);
    setSearchHistory(getSearchHistory());
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const toggleLayout = () => {
    setLayoutMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  // Filter and search products
  const filteredProducts = useMemo(() => {
    const query = searchParams.get('q') || '';
    if (!query.trim()) return [];

    let products = mockProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase()));

    // Category filter
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    if (minPrice) {
      products = products.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter((p) => p.price <= Number(maxPrice));
    }

    // NFT filter
    if (nftOnly) {
      products = products.filter((p) => p.attributes?.hasNFT === true);
    }

    return products;
  }, [searchParams, selectedCategory, minPrice, maxPrice, nftOnly]);

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

  const currentQuery = searchParams.get('q') || '';
  const hasSearched = currentQuery.trim().length > 0;

  return (
    <div className="-mx-4 -mt-4 min-h-screen pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900" aria-label="뒤로 가기">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="상품명을 검색하세요"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
            />
            <button type="button" onClick={handleSearch} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors" aria-label="검색">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4">
        {!hasSearched ? (
          <>
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">최근 검색어</h2>
                  <button type="button" onClick={handleClearHistory} className="text-sm text-gray-500 hover:text-gray-700">
                    전체 삭제
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query) => (
                    <div key={query} className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 rounded-full text-sm">
                      <button type="button" onClick={() => handleHistoryClick(query)} className="text-gray-700 hover:text-gray-900">
                        {query}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveHistory(query);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="삭제">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {searchHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500">검색어를 입력해주세요</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Filters */}
            <div className="mt-4 space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">카테고리</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedCategory === cat.id ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">가격</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="최소"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  />
                  <span className="text-gray-500">~</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="최대"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* NFT Filter */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="nft-only" checked={nftOnly} onChange={(e) => setNftOnly(e.target.checked)} className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500" />
                <label htmlFor="nft-only" className="text-sm text-gray-700">
                  NFT 인증 상품만 보기
                </label>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mt-6 mb-4">
              <p className="text-sm text-gray-600">
                검색 결과 <span className="font-semibold text-gray-900">{sortedProducts.length}개</span>
              </p>
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
                      <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                      <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                        {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleSortChange(option)}
                            className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors ${
                              sortOption === option ? 'text-violet-600 font-semibold bg-violet-50' : 'text-gray-700'
                            }`}>
                            {SORT_LABELS[option]}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500">검색 결과가 없습니다</p>
                <p className="text-sm text-gray-400 mt-2">다른 검색어를 입력해보세요</p>
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
          </>
        )}
      </div>
    </div>
  );
}
