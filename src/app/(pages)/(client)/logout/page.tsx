import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import LoadingComponent from '@/components/layouts/Loading/LoadingComponent';

function LogoutPage() {
  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  }, []);
  return <LoadingComponent />;
}

export default LogoutPage;
