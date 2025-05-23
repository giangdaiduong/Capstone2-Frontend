import { Mail, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
const FOOTER_CONTACT = {
  company: 'Tên công ty của bạn',
  name: 'Tên người liên hệ',
  phone: '+84 123 456 789',
  email: 'info@ideax.com',
};

const FOOTER_LINKS = [
  {
    title: 'Sản phẩm',
    items: [
      { label: 'Giải pháp A', href: '/solutions/a' },
      { label: 'Giải pháp B', href: '/solutions/b' },
      { label: 'Dịch vụ', href: '/services' },
    ],
  },
  {
    title: 'Công ty',
    items: [
      { label: 'Về chúng tôi', href: '/about' },
      { label: 'Tuyển dụng', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Hỗ trợ',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Liên hệ', href: '/contact' },
    ],
  },
];

// Component con cho phần thông tin liên hệ
const ContactInfo = ({ company, name, phone, email }) => (
  <div>
    <h3 className="text-gray-700 font-semibold mb-2">{company}</h3>
    <p className="text-gray-600 font-semibold">{name}</p>
    <div className="flex items-center mt-2">
      <Phone className="w-5 h-5 text-gray-600 mr-2" />
      <p className="text-gray-600">{phone}</p>
    </div>
    <div className="flex items-center mt-2">
      <Mail className="w-5 h-5 text-gray-600 mr-2" />
      <p className="text-gray-600">{email}</p>
    </div>
  </div>
);

// Component con cho mỗi mục liên kết (Sản phẩm, Công ty, Hỗ trợ)
const LinkSection = ({ title, items }) => (
  <div>
    <h3 className="text-gray-700 font-semibold mb-2">{title}</h3>
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li key={idx}>
          <a href={item.href} className="text-gray-600 hover:text-blue-600">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Component con cho các liên kết mạng xã hội
const SocialLinks = () => (
  <div className="flex space-x-4 mt-2">
    <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Facebook">
      <Facebook className="w-6 h-6" />
    </a>
    <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Twitter">
      <Twitter className="w-6 h-6" />
    </a>
    <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="LinkedIn">
      <Linkedin className="w-6 h-6" />
    </a>
    {/* Thêm các icon mạng xã hội khác nếu cần */}
  </div>
);

function FooterClient() {
  return (
    <footer className="bg-white p-6 shadow-md">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Phần thông tin liên hệ */}
        <ContactInfo {...FOOTER_CONTACT} />

        {/* Các mục liên kết động */}
        {FOOTER_LINKS.map((section, index) => (
          <LinkSection key={index} {...section} />
        ))}

        {/* Phần kết nối mạng xã hội */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Kết nối với IDEAX</h3>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

export default FooterClient;