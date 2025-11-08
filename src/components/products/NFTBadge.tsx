import { ShieldCheck } from 'lucide-react';

interface NFTBadgeProps {
  size?: 'sm' | 'md';
}

export default function NFTBadge({ size = 'sm' }: NFTBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  };

  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <div className={`inline-flex items-center gap-1 bg-violet-100 text-violet-700 rounded-full font-medium ${sizeClasses[size]}`}>
      <ShieldCheck size={iconSize} />
      <span>NFT 인증</span>
    </div>
  );
}
