// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PublicLayout from './components/PublicLayout';
import Analytics from './Analytics'; // Ensure the path is correct

// Public Pages
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import NewsPage from './components/NewsPage';
import UpcomingPage from './components/UpcomingPage';
import ArticlePage from './components/ArticlePage';
import SearchPage from './components/SearchPage';
import ContactPage from './components/ContactPage';

// Admin Dashboard Components
import AdminLogin from './admin/pages/AdminLogin';
import DashboardHome from './admin/components/DashboardHome';
import Products from './admin/pages/Products';
import News from './admin/pages/News';
import AdminDashboardWrapper from './admin/pages/AdminDashboardWrapper';
import Banners from './admin/pages/Banners'; // New Import

function App() {
  return (
    <Router>
      <Analytics />
      <ScrollToTop />
      <Routes>
        {/* Admin Login with Public Layout */}
        <Route path="/admin" element={<PublicLayout><AdminLogin /></PublicLayout>} />

        {/* Admin Dashboard Routes - Self-contained Layout */}
        <Route path="/admin/dashboard" element={<AdminDashboardWrapper />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="news" element={<News />} />
          <Route path="banners" element={<Banners />} /> {/* New Route */}
        </Route>
        
        {/* Public Routes - Wrapped in PublicLayout */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<ArticlePage />} />
                <Route path="/upcoming" element={<UpcomingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;