import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bot, Clock, Heart, ShieldCheck } from 'lucide-react';
import CategoryTabs from '@/components/home/CategoryTabs';
import SectionHeader from '@/components/home/SectionHeader';
import ProductCard from '@/components/products/ProductCard';
import GridProductCard from '@/components/products/GridProductCard';
import HorizontalProductCard from '@/components/products/HorizontalProductCard';
import { useScrollToAnchor } from '@/hooks/useScrollToAnchor';
import { mockProducts } from '@/data/mockData';
import { categorySections } from '@/constants/navigation';
import { hasNFT, isLiked } from '@/utils/productUtils';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ai-recommend');
  const scrollToAnchor = useScrollToAnchor(104); // header(56) + tabs(48)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    scrollToAnchor(tabId);
  };

  const handleNavigateToCategory = (categoryId: string) => {
    navigate(`/category/${categoryId}`, { viewTransition: true });
  };

  const nftVerifiedProducts = mockProducts.filter((p) => hasNFT(p));

  return (
    <div className="-mx-4 -mt-4">
      <CategoryTabs tabs={categorySections} activeTab={activeTab} onTabClick={handleTabClick} />

      <div className="pb-4">
        {/* AI 추천 - 가로 스크롤 */}
        <section id="ai-recommend" className="mt-6">
          <SectionHeader icon={Bot} title="AI 기반 맞춤 추천" actionLabel="더보기" onActionClick={() => handleNavigateToCategory('ai-recommend')} />
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
            {mockProducts.map((product) => (
              <HorizontalProductCard key={product.uuid} product={product} />
            ))}
          </div>
        </section>

        {/* NFT 인증 상품 - 그리드 형식 */}
        <section id="nft-verified" className="mt-8">
          <SectionHeader icon={ShieldCheck} title="NFT 정품 인증" actionLabel="더보기" onActionClick={() => handleNavigateToCategory('nft-verified')} />
          <p className="px-4 text-sm text-gray-600 mb-4">블록체인으로 검증된 100% 정품만 모아봤어요</p>
          <div className="grid grid-cols-2 gap-3 px-4">
            {nftVerifiedProducts.map((product) => (
              <GridProductCard key={product.uuid} product={product} />
            ))}
          </div>
        </section>

        {/* 최근 본 상품 - 리스트 형식 */}
        <section id="recent" className="mt-8">
          <SectionHeader icon={Clock} title="최근 본 상품" />
          <div className="space-y-3 px-4">
            {mockProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </div>
        </section>

        {/* 찜한 상품 - 그리드 형식 */}
        <section id="liked" className="mt-8">
          <SectionHeader icon={Heart} title="찜한 상품" actionLabel="더보기" onActionClick={() => handleNavigateToCategory('liked')} />
          <div className="grid grid-cols-2 gap-3 px-4">
            {mockProducts
              .filter((p) => isLiked(p))
              .map((product) => (
                <GridProductCard key={product.uuid} product={product} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
