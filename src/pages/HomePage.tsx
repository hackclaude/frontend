import { useState } from 'react';
import { Bot, Clock, Heart, MapPin } from 'lucide-react';
import CategoryTabs from '@/components/home/CategoryTabs';
import SectionHeader from '@/components/home/SectionHeader';
import ProductCard from '@/components/products/ProductCard';
import GridProductCard from '@/components/products/GridProductCard';
import HorizontalProductCard from '@/components/products/HorizontalProductCard';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import { mockProducts, categorySections } from '@/data/mockData';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('ai-recommend');
  const scrollToAnchor = useScrollToAnchor(104); // header(56) + tabs(48)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    scrollToAnchor(tabId);
  };

  return (
    <div className="-mx-4 -mt-4">
      <CategoryTabs tabs={categorySections} activeTab={activeTab} onTabClick={handleTabClick} />

      <div className="pb-4">
        {/* AI 추천 - 가로 스크롤 */}
        <section id="ai-recommend" className="mt-6">
          <SectionHeader icon={Bot} title="AI 기반 맞춤 추천" actionLabel="더보기" />
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
            {mockProducts.map((product) => (
              <HorizontalProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 최근 본 상품 - 리스트 형식 */}
        <section id="recent" className="mt-8">
          <SectionHeader icon={Clock} title="최근 본 상품" />
          <div className="space-y-3 px-4">
            {mockProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 찜한 상품 - 그리드 형식 */}
        <section id="liked" className="mt-8">
          <SectionHeader icon={Heart} title="찜한 상품" />
          <div className="grid grid-cols-2 gap-3 px-4">
            {mockProducts
              .filter((p) => p.liked)
              .map((product) => (
                <GridProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>

        {/* 근처 직거래 - 리스트 형식 */}
        <section id="nearby" className="mt-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-violet-600" />
              <h2 className="text-lg font-bold text-gray-900">근처 직거래</h2>
            </div>
            <button type="button" className="text-sm text-violet-600 font-medium">
              지역 설정
            </button>
          </div>
          <div className="space-y-3 px-4">
            {mockProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
