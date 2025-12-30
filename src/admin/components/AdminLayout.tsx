// src/admin/components/AdminLayout.tsx
import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, Box, Newspaper, Image } from 'lucide-react';
import { supabase } from '../../api/supabaseClient';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  };

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `admin-sidebar-link ${isActive ? 'bg-red-600 text-white' : 'hover:bg-gray-700'}`;
  };

  return (
    <div className="admin-layout-container">
      {/* Sidebar */}
      <aside className="admin-sidebar fixed top-0 left-0 bottom-0 z-50">
        <div className="admin-sidebar-header">
          Admin Panel
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={getNavLinkClass('/admin/dashboard')}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/products"
                className={getNavLinkClass('/admin/dashboard/products')}
              >
                <Box size={20} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/news"
                className={getNavLinkClass('/admin/dashboard/news')}
              >
                <Newspaper size={20} />
                <span>News</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/banners"
                className={getNavLinkClass('/admin/dashboard/banners')}
              >
                <Image size={20} />
                <span>Banners</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-900 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content ml-64">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;