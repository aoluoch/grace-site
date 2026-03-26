import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Gimage from '../assets/fav.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Meet The Visionary', href: '#' },
    { name: 'GAM Roadmap', href: '#' },
    { name: 'GAM Care', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#202163]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={Gimage}
              alt="Grace Arena Ministries Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-lg font-semibold text-[#202163]">Grace Arena Ministries</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              className="bg-[#B38E34] hover:bg-[#202163] text-[#FFFFFF] px-6 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Giving
            </a>
          </div>

          <button
            className="md:hidden text-[#202163]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-t border-[#202163]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              className="block bg-[#B38E34] hover:bg-[#202163] text-[#FFFFFF] px-6 py-2 rounded-md font-medium text-sm transition-colors text-center"
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
