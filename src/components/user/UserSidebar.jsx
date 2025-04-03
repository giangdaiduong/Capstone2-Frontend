import React from 'react';
import { SIDEBAR_ITEMS } from '../../constants';

const UserSidebar = () => {

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh mục</h2>
      <ul className="space-y-2">
        {SIDEBAR_ITEMS.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`block p-2 rounded-md ${item.active
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSidebar; 