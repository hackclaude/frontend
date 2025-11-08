import { Home, MessageCircle, User, type LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import HomePage from '@/pages/HomePage';
import ChatPage from '@/pages/ChatPage';
import ProfilePage from '@/pages/ProfilePage';

export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  component: ComponentType;
}

export const navItems: NavItem[] = [
  { to: '/', icon: Home, label: '홈', component: HomePage },
  { to: '/chat', icon: MessageCircle, label: '채팅', component: ChatPage },
  { to: '/profile', icon: User, label: '마이페이지', component: ProfilePage },
];

export const categorySections = [
  { id: 'ai-recommend', label: 'AI 추천' },
  { id: 'nft-verified', label: 'NFT 인증' },
  { id: 'recent', label: '최근 본 상품' },
  { id: 'liked', label: '찜한 상품' },
];
