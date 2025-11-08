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
