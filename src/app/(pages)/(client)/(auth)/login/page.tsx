import { Card } from '@/components/ui/card';
import { Metadata } from 'next';
import LoginPageClient from './page-client';

export const metadata: Metadata = {
  title: 'Đăng nhập',
};

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem-200px)]">
      <Card className="flex flex-row w-full max-w-4xl rounded-lg shadow-lg overflow-hidden p-0">
        <div className="w-1/2 p-8">
          <h2 className="text-xl font-semibold text-405393 mb-2 text-center">ĐĂNG NHẬP</h2>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ</p>
          <LoginPageClient />
        </div>
        <div className="w-1/2 relative bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-black text-5xl font-bold font-audiowide">IDEAX</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
