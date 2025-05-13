import { UserType } from './UserType';

declare module 'next-auth' {
  interface User extends UserType {}

  interface Session {
    user: User;
  }

  interface JWT {
    user: User;
  }
}

// Không cần khai báo DefaultSession vì đã có User interface ở trên
declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}
