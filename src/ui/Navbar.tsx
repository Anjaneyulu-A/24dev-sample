import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// The Navbar component is small and focused on a single task: rendering navigation links.
// This is a good practice for maintainability and reusability.
interface NavItem {
  name: string;
  key: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const location = useLocation();
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.key}
          to={`/${item.key}`}
          className={`text-white text-lg font-medium hover:text-red-500 transition-colors ${location.pathname === `/${item.key}` ? 'text-red-500' : ''}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;