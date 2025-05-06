import { FacebookIcon, Instagram, Twitter } from 'lucide-react';

export const NOTIFICATIONS = [
  {
    message: 'Mã OTP mới đã được gửi đi. Vui lòng kiểm tra email.',
    isSuccess: true,
  },
  {
    message: 'Mã OTP không chính xác. Vui lòng kiểm tra lại!',
    isSuccess: false,
  },
  {
    message: 'Xác nhận email thành công! Hướng dẫn đã được gửi.',
    isSuccess: true,
  },
];

export const SIDEBAR_ITEMS = [
  { label: 'Danh mục yêu cầu', href: '#', active: true },
  { label: 'Công việc', href: '#' },
  { label: 'Giao dịch', href: '#' },
  { label: 'Đơn hàng', href: '#' },
  { label: 'sổ - Văn bản', href: '#' },
  { label: 'Yêu cầu', href: '#' },
  { label: 'Tìm kiếm', href: '#' },
];

export const REQUESTS = [
  {
    id: 1,
    title: 'Yêu cầu hỗ trợ về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Đã duyệt',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng cần hỗ trợ xác xe, quý khách vui lòng cung cấp thêm thông tin để được hỗ trợ nhanh nhất.',
  },
  {
    id: 2,
    title: 'Yêu cầu hỗ trợ về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Đang duyệt',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng cần hỗ trợ xác xe, quý khách vui lòng cung cấp thêm thông tin để được hỗ trợ nhanh nhất.',
  },
  {
    id: 3,
    title: 'Yêu cầu hỗ trợ về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Không duyệt',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng cần hỗ trợ xác xe, quý khách vui lòng cung cấp thêm thông tin để được hỗ trợ nhanh nhất.',
  },
  {
    id: 4,
    title: 'Yêu cầu hỗ trợ về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Đã duyệt ',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng cần hỗ trợ xác xe, quý khách vui lòng cung cấp thêm thông tin để được hỗ trợ nhanh nhất.',
  },
  {
    id: 5,
    title: 'Yêu cầu hỗ trợ về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Đang duyệt',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng cần hỗ trợ xác xe, quý khách vui lòng cung cấp thêm thông tin để được hỗ trợ nhanh nhất.',
  },
  // fake 6 to 10
  {
    id: 6,
    title: 'Yêu cầu về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Đang duyệt',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng cần quý khách vui lòng cung cấp thêm thông tin để được nhanh nhất.',
  },
  {
    id: 7,
    title: 'Yêu cầu về việc xác xe',
    user: 'Phương Thảo',
    date: 'Ngày yêu cầu: 20/10/2023',
    status: 'Đã Duyệt',
    details:
      'Số yêu cầu: 123456 - Quý khách hàng xác xe, quý khách vuiổi cung cấp thêm thông tin để được nhanh nhất.',
  },
];

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
