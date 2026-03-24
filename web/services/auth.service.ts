import axiosClient from '@/lib/axios';
import {
  clearTokens,
  setStoredUser,
  setTokenPair,
  setUserRole,
} from '@/lib/tokens';
import type {
  AuthResponse,
  CompleteFarmerProfileDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterBuyerDto,
  RegisterFarmerDto,
  ResetPasswordDto,
  TokenPair,
} from '@/lib/types/auth.types';
import type { UserProfile } from '@/lib/types/user.types';

export const authService = {
  async registerBuyer(dto: RegisterBuyerDto): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>(
      '/auth/register/buyer',
      dto
    );
    setTokenPair({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    setStoredUser(data.user);
    setUserRole(data.user.role);
    return data;
  },

  async registerFarmer(dto: RegisterFarmerDto): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>(
      '/auth/register/farmer',
      dto
    );
    setTokenPair({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    setStoredUser(data.user);
    setUserRole(data.user.role);
    return data;
  },

  async completeFarmerProfile(
    dto: CompleteFarmerProfileDto
  ): Promise<UserProfile> {
    // Server returns { message: "..." } — not a UserProfile.
    // After completing, fetch the fresh user via /auth/me which includes
    // role, farmerProfile.profileComplete=true, crops, bio, etc.
    await axiosClient.post('/auth/farmer/complete-profile', dto);
    const freshUser = await authService.getMe();
    setStoredUser(freshUser);
    setUserRole(freshUser.role);
    return freshUser;
  },

  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await axiosClient.post<AuthResponse>('/auth/login', dto);
    console.log('[authService.login] Response received:', {
      hasAccessToken: !!data.accessToken,
      hasRefreshToken: !!data.refreshToken,
      hasUser: !!data.user,
      userRole: data.user?.role,
      userEmail: data.user?.email,
    });

    if (!data.user || !data.user.role) {
      console.error('[authService.login] Invalid response structure:', data);
      throw new Error('Invalid login response: missing user or role');
    }

    setTokenPair({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    setStoredUser(data.user);
    setUserRole(data.user.role);
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      await axiosClient.post('/auth/logout', { refreshToken });
    } finally {
      clearTokens();
    }
  },

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    const { data } = await axiosClient.post<TokenPair>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },

  async forgotPassword(email: string): Promise<void> {
    await axiosClient.post('/auth/forgot-password', { email } as ForgotPasswordDto);
  },

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    await axiosClient.post('/auth/reset-password', dto);
  },

  async getMe(): Promise<UserProfile> {
    const { data } = await axiosClient.get<UserProfile>('/auth/me');
    return data;
  },

  async verifyEmail(token: string): Promise<void> {
    await axiosClient.get(`/auth/verify-email/${token}`);
  },
};
