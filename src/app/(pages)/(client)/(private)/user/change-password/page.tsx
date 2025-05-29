import { Metadata } from 'next';
import ChangePasswordClient from './page.client';

export const metadata: Metadata = {
  title: 'Đổi mật khẩu',
};

async function ChangePasswordPage() {
  return <ChangePasswordClient />;
}

export default ChangePasswordPage;
