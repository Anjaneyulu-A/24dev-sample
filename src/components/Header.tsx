// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import techUvLogo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import Navbar from '../ui/Navbar';
import SocialIcons from '../ui/SocialIcons';

interface NavItem {
  name: string;
  key: string;
}

interface MobileMenuPanelProps {
  onClose: () => void;
  navItems: NavItem[];
  animationClass: string;
}

const NewLogo: React.FC = () => {
  return (
    <Link to="/" className="block cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
      <img src={techUvLogo} alt="Tech UV Logo" className="h-10" />
    </Link>
  );
};

const MobileMenuPanel: React.FC<MobileMenuPanelProps> = ({ onClose, navItems, animationClass }) => {
  const { pathname } = useLocation();

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${animationClass}`} role="dialog" aria-modal="true">
      <div className="mobile-menu-panel-overlay" onClick={onClose}></div>
      <div className="mobile-menu-panel">
        <div className="flex flex-col h-full">
          <div className="mobile-menu-panel-header">
            <div className="w-2/3"><NewLogo /></div>
            <button onClick={onClose} className="text-white p-2" aria-label="Close menu"><X size={24} /></button>
          </div>
          <div className="mobile-menu-panel-nav">
            <nav className="flex flex-col items-center py-4 space-y-2 border-t mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={`/${item.key}`}
                  onClick={onClose}
                  className={`w-full py-2 text-lg text-center font-medium hover:bg-gray-100 transition-colors ${pathname === `/${item.key}` ? 'text-red-500' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                onClick={onClose} 
                className={`w-full py-2 text-lg text-center font-medium hover:bg-gray-100 transition-colors ${pathname === `/contact` ? 'text-red-500' : ''}`}
              >
                Contact Us
              </Link>
            </nav>
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm mb-2">Follow Us</p>
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const navItems = [
    { name: 'Products', key: 'products' },
    { name: 'News', key: 'news' },
    { name: 'Upcoming', key: 'upcoming' },
  ];

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
    setIsClosing(false);
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300); // Duration matches CSS fadeOut animation
  };

  useEffect(() => {
    document.body.classList.toggle('body-no-scroll', isMenuOpen);
    return () => document.body.classList.remove('body-no-scroll');
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-gray-800 sticky top-0 z-40">
        <div className="header-top-bar">
          <div className="max-w-screen-lg mx-auto px-4 py-2 flex justify-end items-center h-8">
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact Us</Link>
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="header-main-bar">
          <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <NewLogo />
            </div>

            <div className="hidden md:flex flex-1 justify-center max-w-2xl">
              <SearchBar />
            </div>

            <Navbar navItems={navItems} />
            <div className="flex items-center space-x-4">
              <div className="md:hidden flex items-center">
                <button onClick={handleOpenMenu} className="text-white p-2" aria-label="Open menu">
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mobile-search-bar">
          <SearchBar />
        </div>
      </header>
      {isMenuOpen && (
        <MobileMenuPanel 
          onClose={handleCloseMenu} 
          navItems={navItems}
          animationClass={isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}
        />
      )}
    </>
  );
};

export default Header;