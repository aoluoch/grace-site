import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Gimage from '../assets/fav.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Events', to: '/events' },
    { name: 'Meet The Visionary', to: '/about' },
    { name: 'GAM Roadmap', sectionId: 'gam-roadmap' },
    { name: 'GAM Care', sectionId: 'gam-care' },
  ];

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return false;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  };

  const goToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      scrollToSection(sectionId);
      return;
    }

    navigate(`/#${sectionId}`);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const goHome = () => {
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

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
            {navLinks.map((link) =>
              link.to ? (
                link.name === 'Home' ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={goHome}
                    className="cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                )
              ) : (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => goToSection(link.sectionId!)}
                  className="cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium"
                >
                  {link.name}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => goToSection('payment')}
              className="cursor-pointer bg-[#B38E34] hover:bg-[#202163] text-[#FFFFFF] px-6 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Giving
            </button>
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
            {navLinks.map((link) =>
              link.to ? (
                link.name === 'Home' ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={goHome}
                    className="block w-full text-left cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium py-2"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="block cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium py-2"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )
              ) : (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => goToSection(link.sectionId!)}
                  className="block w-full text-left cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium py-2"
                >
                  {link.name}
                </button>
              )
            )}
            <button
              type="button"
              onClick={() => goToSection('payment')}
              className="block cursor-pointer bg-[#B38E34] hover:bg-[#202163] text-[#FFFFFF] px-6 py-2 rounded-md font-medium text-sm transition-colors text-center"
            >
              Giving
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
