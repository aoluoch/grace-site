import { Menu, X, UserCircle, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Gimage from "../assets/fav.png";
import { useAuth } from "../context/AuthContext";

type NavLink = { name: string; to: string; external?: boolean };

const primaryLinks: NavLink[] = [
  { name: "Events", to: "/events" },
  { name: "Sermons", to: "/sermons" },
  { name: "Connect", to: "/connect" },
];

const ministryLinks: NavLink[] = [
  { name: "Meet The Visionary", to: "/about" },
  { name: "GAM Roadmap", to: "/roadmap" },
  { name: "GAM Care", to: "/care" },
  { name: "Announcements", to: "/announcements" },
];

const linkClass =
  "cursor-pointer text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMinistryOpen, setIsMinistryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const ministryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close the Ministry dropdown when clicking outside.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ministryRef.current &&
        !ministryRef.current.contains(e.target as Node)
      ) {
        setIsMinistryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const goHome = () => {
    setIsMenuOpen(false);
    if (location.pathname === "/") {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  return (
    <nav
      data-site-navbar="true"
      className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#202163]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={goHome}>
            <img
              src={Gimage}
              alt="Grace Arena Ministries Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:block text-base font-semibold text-[#202163] lg:text-lg">
              Grace Arena Ministries
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            <button type="button" onClick={goHome} className={linkClass}>
              Home
            </button>

            {/* Ministry dropdown */}
            <div ref={ministryRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMinistryOpen((v) => !v)}
                aria-expanded={isMinistryOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 ${linkClass}`}
              >
                Ministry
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isMinistryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMinistryOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-[#e5e5ee] bg-white py-1 shadow-lg">
                  {ministryLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      onClick={() => setIsMinistryOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-[#202163] transition-colors hover:bg-[#202163]/5 hover:text-[#B38E34]"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {primaryLinks.map((link) => (
              <Link key={link.name} to={link.to} className={linkClass}>
                {link.name}
              </Link>
            ))}

            <a
              href="https://gracearena.me/"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Shop
            </a>

            <Link
              to="/giving"
              className="cursor-pointer bg-[#B38E34] hover:bg-[#202163] text-[#FFFFFF] px-5 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Giving
            </Link>

            <Link
              to={user ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-1.5 text-[#202163] hover:text-[#B38E34] transition-colors text-sm font-medium"
            >
              <UserCircle size={20} />
              {user ? "Account" : "Sign in"}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-[#202163]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-t border-[#202163] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <button
              type="button"
              onClick={goHome}
              className="block w-full text-left py-2.5 text-sm font-medium text-[#202163] hover:text-[#B38E34]"
            >
              Home
            </button>

            <p className="pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-[#9a9ab0]">
              Ministry
            </p>
            {ministryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                className="block py-2.5 pl-3 text-sm font-medium text-[#202163] hover:text-[#B38E34]"
              >
                {link.name}
              </Link>
            ))}

            <p className="pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-[#9a9ab0]">
              Explore
            </p>
            {primaryLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                className="block py-2.5 pl-3 text-sm font-medium text-[#202163] hover:text-[#B38E34]"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://gracearena.me/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="block py-2.5 pl-3 text-sm font-medium text-[#202163] hover:text-[#B38E34]"
            >
              Shop
            </a>

            <div className="flex items-center gap-3 pt-4">
              <Link
                to="/giving"
                onClick={closeMenu}
                className="flex-1 bg-[#B38E34] hover:bg-[#202163] text-center text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
              >
                Giving
              </Link>
              <Link
                to={user ? "/dashboard" : "/login"}
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#202163]/30 px-4 py-2.5 text-sm font-medium text-[#202163] hover:text-[#B38E34]"
              >
                <UserCircle size={20} />
                {user ? "Account" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
