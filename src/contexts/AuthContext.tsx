import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import authService, { type User } from '@/services/auth.service';
import { isAuthenticated } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user_id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로드 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const hasToken = isAuthenticated();

      if (hasToken) {
        try {
          const response = await authService.getMe();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (user_id: string, password: string) => {
    const response = await authService.login({
      type: 'credentials',
      credentials: { user_id, password },
    });

    if (response.success) {
      // 로그인 성공 후 사용자 정보 가져오기
      const userResponse = await authService.getMe();

      if (userResponse.success && userResponse.data) {
        setUser(userResponse.data);
      }
    } else {
      throw new Error(response.error?.join(', ') || 'Login failed');
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refetchUser = async () => {
    if (isAuthenticated()) {
      const response = await authService.getMe();
      if (response.success && response.data) {
        setUser(response.data);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refetchUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
