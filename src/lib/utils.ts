/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export function camelToPascal(obj: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const key in obj) {
    out[key.charAt(0).toUpperCase() + key.slice(1)] = obj[key];
  }
  return out;
}

export const IdeaStatus = [
  { key: 'new', value: 'Mới' },
  { key: 'mvp', value: 'MVP (Minimum Viable Product)' },
  { key: 'growth', value: 'Giai đoạn tăng trưởng' },
  { key: 'expansion', value: 'Giai đoạn mở rộng' },
  { key: 'closed', value: 'Đã đóng' },
];

export const Policy = [
  {
    title: 'Cam kết về tính chính xác của thông tin',
    child: [
      'Startup chịu trách nhiệm về tính trung thực, chính xác của tất cả thông tin cung cấp.',
      'Nếu phát hiện thông tin sai lệch hoặc gian lận, nền tảng có quyền từ chối hoặc gỡ bỏ dự án gọi vốn.',
    ],
  },
  {
    title: 'Quyền sở hữu trí tuệ & bảo mật',
    child: [
      'Startup phải đảm bảo rằng họ có quyền hợp pháp đối với ý tưởng đăng tải.',
      'Nếu chưa có đăng ký bản quyền, startup phải tự chịu trách nhiệm về rủi ro liên quan đến tranh chấp sở hữu trí tuệ.',
      'Nhà đầu tư cam kết không sử dụng thông tin startup sai mục đích hoặc tiết lộ cho bên thứ ba khi chưa có sự đồng ý.',
    ],
  },
  {
    title: 'Trách nhiệm của nền tảng',
    child: [
      'Nền tảng chỉ đóng vai trò kết nối startup và nhà đầu tư, không chịu trách nhiệm về quyết định đầu tư hoặc kết quả tài chính.',
      'Nền tảng không đảm bảo rằng startup sẽ gọi vốn thành công.',
    ],
  },
  {
    title: 'Điều kiện sử dụng & Hủy bỏ dự án',
    child: [
      'Startup phải tuân thủ các quy định pháp luật hiện hành về gọi vốn.',
      'Nền tảng có quyền hủy dự án nếu phát hiện vi phạm hoặc có yêu cầu từ cơ quan pháp lý.',
    ],
  },
  {
    title: 'Đồng ý điều khoản',
    child: ['Tôi cam kết thông tin cung cấp là chính xác.', 'Tôi đồng ý với điều khoản và điều kiện của nền tảng.'],
    agree: true,
  },
];
