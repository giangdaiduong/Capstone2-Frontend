import { UserType } from './UserType';

declare module 'next-auth' {
  interface Session {
    user: UserType;
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    user: UserType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number; // timestamp (ms) khi token hết hạn
    error?: string; // lưu lỗi refresh nếu có
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: UserType;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
