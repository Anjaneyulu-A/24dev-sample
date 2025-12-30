import React from 'react';

const DashboardHome: React.FC = () => {
  return (
    <div className="admin-card">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to the Admin Dashboard</h1>
      <p className="text-lg text-gray-700">
        Use the sidebar to manage your website's content, including products, news, and banners.
      </p>
    </div>
  );
};

export default DashboardHome;