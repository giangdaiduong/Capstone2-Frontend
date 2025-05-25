export const FOOTER_CONTACT = {
  company: 'Thành Lập Bởi',
  name: 'IDEAX',
  phone: '(+123) 456-7890',
  email: 'ideax@gmail.com',
};

export const FOOTER_LINKS = [
  {
    title: 'Sản Phẩm',
    items: [
      { label: 'Bài viết đã đăng', href: '#' },
      { label: 'Đăng bài viết mới', href: '#' },
      { label: 'Gọi vốn đầu tư', href: '#' },
    ],
  },
  {
    title: 'Liên Hệ',
    items: [
      { label: 'Công nghệ', href: '#' },
      { label: 'Y tế', href: '#' },
      { label: 'Tài chính', href: '#' },
    ],
  },
  {
    title: 'Khu vực',
    items: [
      { label: 'Hà Nội', href: '#' },
      { label: 'Đà Nẵng', href: '#' },
      { label: 'Hồ Chí Minh', href: '#' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { platform: 'Facebook', href: '#' },
  { platform: 'Twitter', href: '#' },
  { platform: 'Instagram', href: '#' },
];

export const PAGE_SIZE = 5;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

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

export enum UserRole {
  Admin = 'Admin',
  Investor = 'Investor',
  Founder = 'Founder',
}
