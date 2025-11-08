import { useState } from 'react';
import { Outlet } from 'react-router';
import type { LayoutContextType } from '@/hooks/useLayoutContext';
import Header from './Header';
import BottomNav from './BottomNav';

export default function MobileLayout() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  const context: LayoutContextType = {
    hideHeader: setHeaderHidden,
    hideBottomNav: setBottomNavHidden,
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-(--bg-color) relative">
        {!headerHidden && <Header />}
        <main className="pb-16 p-4">
          <Outlet context={context} />
        </main>
        {!bottomNavHidden && <BottomNav />}
      </div>
    </div>
  );
}
