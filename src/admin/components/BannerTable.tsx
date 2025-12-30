// src/admin/components/BannerTable.tsx
import React from 'react';
import { Banner } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

interface BannerTableProps {
  banners: Banner[];
  editingBanner: Banner | null;
  onEdit: (banner: Banner) => void;
  onDelete: (id: string) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({ banners, editingBanner, onEdit, onDelete }) => {
  return (
    <div className="admin-table-container">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="admin-table-header">Image</th>
            <th scope="col" className="admin-table-header">Link</th>
            <th scope="col" className="admin-table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {banners.map((banner) => (
            <tr key={banner.id} className={editingBanner?.id === banner.id ? 'bg-red-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">
                {banner.image && (
                  <img src={banner.image} alt="Banner" className="h-12 w-12 object-contain rounded" />
                )}
              </td>
              <td className="admin-table-cell-text-truncate">{banner.link}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(banner)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(banner.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTable;