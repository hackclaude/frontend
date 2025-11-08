import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export default function SectionHeader({ icon: Icon, title, actionLabel, onActionClick }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 mb-4">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-violet-600" />
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {actionLabel && (
        <button type="button" onClick={onActionClick} className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900">
          {actionLabel}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
