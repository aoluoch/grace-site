import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Meet The Visionary', href: '#' },
    { name: 'GAM Roadmap', href: '#' },
    { name: 'GAM Care', href: '#' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8 L20 8 L28 20 L20 32 L8 32 Z" fill="#6366F1" />
                <path d="M20 8 L32 8 L32 32 L20 32 L28 20 Z" fill="#4F46E5" />
                <text x="12" y="25" fill="white" fontSize="12" fontWeight="bold">GA</text>
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">Grace Arena Ministries</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              className="bg-[#D4AF37] hover:bg-[#C5A028] text-white px-6 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Giving
            </a>
          </div>

          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              className="block bg-[#D4AF37] hover:bg-[#C5A028] text-white px-6 py-2 rounded-md font-medium text-sm transition-colors text-center"
            >
              Giving
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
