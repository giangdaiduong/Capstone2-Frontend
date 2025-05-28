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

export const IdeaStage = [
  { key: 'NEW', value: 'Mới' },
  { key: 'MVP', value: 'MVP (Minimum Viable Product)' },
  { key: 'GROWTH', value: 'Giai đoạn tăng trưởng' },
  { key: 'EXPANSION', value: 'Giai đoạn mở rộng' },
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

export const IdeaStatus = [
  { key: 'draft', value: 'Bản nháp' },
  { key: 'pending', value: 'Chờ duyệt' },
  { key: 'approved', value: 'Đã duyệt' },
  { key: 'rejected', value: 'Từ chối' },
];

export const IdeaRegion = [
  { key: 'Hà Nội', value: 'Hà Nội' },
  { key: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
  { key: 'Đà Nẵng', value: 'Đà Nẵng' },
  { key: 'Đồng Nai', value: 'Đồng Nai' },
  { key: 'Bình Dương', value: 'Bình Dương' },
  { key: 'Hải Phòng', value: 'Hải Phòng' },
];

export enum UserRole {
  Admin = 'Admin',
  Investor = 'Investor',
  Founder = 'Founder',
}

export const PHILOSOPHIES = [
  {
    avatar: '/philosophy/steve-jobs.jpg',
    quote:
      '“Đừng để tiếng ồn từ những ý kiến khác nhấn chìm tiếng nói sâu thẳm trong lòng bạn. Và điều quan trọng nhất là hãy can đảm để đi theo tiếng gọi của trái tim và trực giác của mình”',
    name: 'Mr. Steve Job',
    position: 'Cựu CEO Apple',
  },
  {
    avatar: '/philosophy/jeff-bezos.jpeg',
    quote: '“Nếu bạn không muốn bị hiểu lầm hay chỉ trích, thì hãy làm ơn, đừng làm gì mới mẻ hay sáng tạo cả”',
    name: 'Mr. Jeff Bezos',
    position: 'Ông chủ bán hàng trực tuyến Amazon',
  },
  {
    avatar: '/philosophy/pham-nhat-vuong.jpeg',
    quote:
      '“Lỡ làm người, rồi không thể sống một cuộc đời phí hoài được” “Mục tiêu của tôi không có gì thay đổi, về bản chất vẫn là làm đẹp cho đời”',
    name: 'Ông Phạm Nhật Vượng',
    position: 'Tỷ phú - Chủ tịch tập đoàn Vingroup',
  },
  {
    avatar: '/philosophy/elon-musk.webp',
    quote:
      '“Tôi nghĩ đó là điều quan trọng để có một công việc mà bạn thực sự yêu thích. Nếu không, bạn sẽ không bao giờ cảm thấy vui vẻ.”',
    name: 'Mr. Elon Musk',
    position: 'CEO Tesla và SpaceX',
  },
  {
    avatar: '/philosophy/bill-gates.webp',
    quote: '“Thành công là một người thầy tồi tệ. Nó quyến rũ những người thông minh nghĩ rằng họ không thể thất bại.”',
    name: 'Mr. Bill Gates',
    position: 'Nhà sáng lập Microsoft',
  },
];
