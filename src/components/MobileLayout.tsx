import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Plus } from 'lucide-react';
import type { LayoutContextType } from '@/hooks/useLayoutContext';
import Header from './Header';
import BottomNav from './BottomNav';

export default function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  const context: LayoutContextType = {
    hideHeader: setHeaderHidden,
    hideBottomNav: setBottomNavHidden,
  };

  // 플로팅 버튼을 보여줄 페이지 (홈페이지에만)
  const showFloatingButton = location.pathname === '/' && !bottomNavHidden;

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-(--bg-color) relative">
        {!headerHidden && <Header />}
        <main className={`p-4 ${bottomNavHidden || headerHidden ? 'pb-0' : 'pb-16'}`}>
          <Outlet context={context} />
        </main>
        {!bottomNavHidden && <BottomNav />}
      </div>

      {/* 플로팅 상품 등록 버튼 */}
      {showFloatingButton && (
        <button
          type="button"
          onClick={() => navigate('/product/register')}
          className="fixed bottom-20 right-[calc(50%-480px/2+1rem)] w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-[0_8px_20px_rgba(124,58,237,0.5)] hover:shadow-[0_10px_24px_rgba(124,58,237,0.6)] flex items-center justify-center transition-all z-20 max-[calc(480px+2rem)]:right-4"
          aria-label="상품 등록">
          <Plus size={28} />
        </button>
      )}
    </div>
  );
}
