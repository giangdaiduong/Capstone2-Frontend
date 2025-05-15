import { FOOTER_CONTACT, FOOTER_LINKS } from '@/utils/constants';
import { Mail, Phone } from 'lucide-react';

function FooterClient() {
  return (
    <footer className="bg-white p-6 shadow-md">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">{FOOTER_CONTACT.company}</h3>
          <p className="text-gray-600 font-semibold">{FOOTER_CONTACT.name}</p>
          <div className="flex items-center mt-2">
            <Phone className="w-5 h-5 text-gray-600 mr-2" />
            <p className="text-gray-600">{FOOTER_CONTACT.phone}</p>
          </div>
          <div className="flex items-center mt-2">
            <Mail className="w-5 h-5 text-gray-600 mr-2" />
            <p className="text-gray-600">{FOOTER_CONTACT.email}</p>
          </div>
        </div>

        {FOOTER_LINKS.map((section, index) => (
          <div key={index}>
            <h3 className="text-gray-700 font-semibold mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="text-gray-600 hover:text-blue-600">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Kết nối với IDEAX</h3>
        </div>
      </div>
    </footer>
  );
}

export default FooterClient;
