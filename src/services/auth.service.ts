import { apiClient, setAuthTokens, clearAuthTokens, type ApiResponse } from '@/lib/api-client';

export interface User {
  uuid: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  user_state?: {
    points: number;
  };
}

export interface LoginCredentials {
  type: 'credentials';
  credentials: {
    user_id: string;
    password: string;
  };
}

export interface SignupData extends LoginCredentials {
  name: string;
  email: string;
  phone: string;
  birthday: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  user?: User;
  tokens?: AuthTokens;
  access_token?: string;
  refresh_token?: string;
  // Backend actual response format
  token?: string;
  refreshToken?: string;
}

export interface LoginHistoryItem {
  id: number;
  ip: string;
  user_agent: Record<string, unknown>;
  login_at: string;
}

const authService = {
  // 회원가입
  signup: async (data: SignupData) => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/signup', data);
    if (response.data.success && response.data.data) {
      const { tokens, access_token, refresh_token, token, refreshToken } = response.data.data;
      if (tokens) {
        setAuthTokens(tokens.access_token, tokens.refresh_token);
      } else if (access_token && refresh_token) {
        setAuthTokens(access_token, refresh_token);
      } else if (token && refreshToken) {
        setAuthTokens(token, refreshToken);
      }
    }
    return response.data;
  },

  // 로그인
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);

    if (response.data.success && response.data.data) {
      const { tokens, access_token, refresh_token, token, refreshToken } = response.data.data;

      if (tokens) {
        setAuthTokens(tokens.access_token, tokens.refresh_token);
      } else if (access_token && refresh_token) {
        setAuthTokens(access_token, refresh_token);
      } else if (token && refreshToken) {
        setAuthTokens(token, refreshToken);
      }
    }
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      clearAuthTokens();
    }
  },

  // 내 정보 조회
  getMe: async () => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/@me');
    return response.data;
  },

  // 로그인 이력 조회
  getLoginHistory: async () => {
    const response = await apiClient.get<ApiResponse<LoginHistoryItem[]>>('/auth/login-history');
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  },
};

export default authService;
