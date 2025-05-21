// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, User } from 'next-auth';
import { httpServerApi } from '@/api-base';
import { AuthServiceIds } from '@/api-base/services/auth-services';
import { UserType } from '@/types/UserType';

export const authOptions: NextAuthOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      // ** Tên để hiển thị trên biểu mẫu đăng nhập (ví dụ: 'Đăng nhập bằng ...')
      // ** Để biết thêm chi tiết về nhà cung cấp thông tin đăng nhập, hãy truy cập https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials',

      /*
       * Vì chúng tôi đang sử dụng trang đăng nhập của riêng mình, chúng tôi không cần phải thay đổi
       * Tên người dùng hoặc các thuộc tính mật khẩu theo cách thủ công trong đối tượng thông tin đăng nhập sau.
       */
      credentials: {},
      async authorize(credentials): Promise<User | null> {
        /*
         * Bạn cần cung cấp logic của riêng bạn ở đây để có thông tin đăng nhập và trả lại
         * một đối tượng đại diện cho người dùng hoặc giá trị sai/null nếu thông tin đăng nhập không hợp lệ.
         * Ví dụ:return {id: 1, tên: 'j Smith', email: 'jsmith@example.com'}
         * Bạn cũng có thể sử dụng đối tượng `req` để có được các tham số bổ sung (nghĩa là, địa chỉ IP yêu cầu)
         */

        try {
          const { userName, password } = credentials as { userName: string; password: string };

          if (!userName || !password) {
            throw new Error('Thiếu tên đăng nhập hoặc mật khẩu');
          }

          const res = await (
            await httpServerApi()
          ).execService(
            { id: AuthServiceIds.Login },
            {
              userName,
              password,
            }
          );

          if (!res.ok) {
            throw new Error(res?.data?.message || 'Đăng nhập thất bại');
          }

          const { user, accessToken, refreshToken, expiresIn } = res.data;

          return {
            ...user,
            accessToken,
            refreshToken,
            expiresIn,
          } as UserType & {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
          };
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }

          throw new Error('Có lỗi khi đăng nhập');
        }
      },
    }),

    // GoogleProvider({
    //   clientId:
    //     process.env.GOOGLE_CLIENT_ID ??
    //     (() => {
    //       throw new Error('GOOGLE_CLIENT_ID is not defined');
    //     })(),
    //   clientSecret:
    //     process.env.GOOGLE_CLIENT_SECRET ??
    //     (() => {
    //       throw new Error('GOOGLE_CLIENT_SECRET is not defined');
    //     })(),
    // }),

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Chọn cách bạn muốn lưu phiên người dùng.
     * Mặc định là `jwt`, một JWT (JWE) được mã hóa được lưu trữ trong cookie phiên.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * Bạn vẫn có thể buộc một phiên JWT bằng cách xác định rõ ràng `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 7 * 24 * 60, // ** 7 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, refreshToken, expiresIn, ...userFields } = user as UserType;

        token.user = userFields;
        token.accessToken = accessToken ?? '';
        token.refreshToken = refreshToken ?? '';
        token.accessTokenExpires = Date.now() + (expiresIn ?? 0) * 1000; // ms
        return token;
      }

      return token;

      // if (Date.now() < (token.accessTokenExpires as number)) {
      //   return token;
      // }

      // try {
      //   const res = await (
      //     await httpServerApi()
      //   ).execService({ id: AuthServiceIds.RefreshToken }, { refreshToken: token.refreshToken });

      //   if (!res.ok) throw new Error(res?.data?.message);

      //   const { accessToken, refreshToken, expiresIn } = res.data;

      //   return {
      //     ...token,
      //     accessToken,
      //     refreshToken: refreshToken ?? token.refreshToken,
      //     accessTokenExpires: Date.now() + expiresIn * 1000,
      //   };
      // } catch (err) {
      //   console.error('❌ Lỗi refresh token:', err);
      //   return redirect('/logout');
      // }
    },
    async session({ session, token }) {
      session.user = token.user as UserType;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
};
