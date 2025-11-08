import { useOutletContext } from 'react-router';

export interface LayoutContextType {
  hideHeader: (hide: boolean) => void;
  hideBottomNav: (hide: boolean) => void;
}

export function useLayoutContext() {
  return useOutletContext<LayoutContextType>();
}
