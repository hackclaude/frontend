import { Outlet } from 'react-router';
import Header from './Header';
import BottomNav from './BottomNav';

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-zinc-200 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-(--bg-color) relative">
        <Header />
        <main className="pb-16 p-4">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
