import { Search, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { navItems } from '@/constants/navigation';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const currentPage = navItems.find((item) => item.to === location.pathname);

  if (isHome) {
    return (
      <header className="sticky top-0 z-10 bg-(--bg-color)">
        <div className="flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles size={24} className="text-violet-600" />
            <span className="text-lg font-bold text-gray-900">서비스명</span>
          </Link>

          <div className="flex items-center gap-3">
            <button type="button" className="p-2 text-gray-600 hover:text-gray-900 hover:bg-violet-50 rounded-full transition-colors" aria-label="검색">
              <Search size={22} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-(--bg-color)">
      <div className="flex items-center justify-center h-14 px-4">
        <h1 className="text-lg font-semibold text-gray-900">{currentPage?.label || '페이지'}</h1>
      </div>
    </header>
  );
}
