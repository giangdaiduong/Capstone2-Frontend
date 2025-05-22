'use client';

import { httpPageApi } from '@/api-base';
import { AuthServiceIds } from '@/api-base/services/auth-services';
import LoadingComponent from '@/components/layouts/Loading/LoadingComponent';
import linkTo from '@/utils/linkTo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

function RefreshTokenPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const isHandling = useRef(false);

  useEffect(() => {
    // Chờ session sẵn sàng
    if (status !== 'authenticated') return;
    if (!session?.refreshToken) {
      router.push(linkTo.logout);
      return;
    }
    if (isHandling.current) return;
    isHandling.current = true;

    const handleRefresh = async () => {
      try {
        /* 1. Gọi API làm mới token */
        const res = await httpPageApi.execService(
          { id: AuthServiceIds.RefreshToken },
          { refreshToken: session.refreshToken }
        );

        if (!res.ok) throw new Error(res?.data?.message);

        const { accessToken, refreshToken, expiresIn } = res.data;

        /* 2. Cập nhật session phía client */
        await update({
          accessToken,
          refreshToken,
          accessTokenExpires: Date.now() + expiresIn * 1000,
        });

        /* 3. Quay lại trang trước (hoặc router.push('/')) */
        router.back();
      } catch (error) {
        console.error('❌ Refresh token failed:', error);
        router.push(linkTo.logout);
      }
    };

    handleRefresh();
  }, [status, session, update, router]);

  return <LoadingComponent />;
}

export default RefreshTokenPage;
