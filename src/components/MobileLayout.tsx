import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router';
import Header from './Header';
import BottomNav from './BottomNav';

interface OutletContextType {
  hideHeader: (hide: boolean) => void;
  hideBottomNav: (hide: boolean) => void;
}

export default function MobileLayout() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  const context: OutletContextType = {
    hideHeader: setHeaderHidden,
    hideBottomNav: setBottomNavHidden,
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-(--bg-color) relative">
        {!headerHidden && <Header />}
        <main className={bottomNavHidden ? 'p-4' : 'pb-16 p-4'}>
          <Outlet context={context} />
        </main>
        {!bottomNavHidden && <BottomNav />}
      </div>
    </div>
  );
}

export function useLayoutContext() {
  return useOutletContext<OutletContextType>();
}
