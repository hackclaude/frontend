import { Link, useLocation } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import { navItems } from '@/constants/navigation';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <Link to={to} className={`flex flex-col items-center justify-center flex-1 h-full ${isActive ? 'text-violet-600' : 'text-gray-500'}`}>
      <Icon size={24} />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} isActive={location.pathname === item.to} />
        ))}
      </div>
    </nav>
  );
}
