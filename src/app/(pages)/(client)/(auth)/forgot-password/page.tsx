import { Metadata } from 'next';
import ForgotPasswordClient from './page.client';

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
};

async function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}

export default ForgotPasswordPage;
