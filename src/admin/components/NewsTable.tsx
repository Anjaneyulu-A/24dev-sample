import React from 'react';
import { NewsArticle } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

interface NewsTableProps {
  articles: NewsArticle[];
  editingArticle: NewsArticle | null;
  onEdit: (article: NewsArticle) => void;
  onDelete: (id: string) => void;
}

const NewsTable: React.FC<NewsTableProps> = ({ articles, editingArticle, onEdit, onDelete }) => {
  return (
    <div className="admin-table-container">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="admin-table-header">Image</th>
            <th scope="col" className="admin-table-header">Title</th>
            <th scope="col" className="admin-table-header">Category</th>
            <th scope="col" className="admin-table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {articles.map((article) => (
            <tr key={article.id} className={editingArticle?.id === article.id ? 'bg-red-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">
                {article.image && article.image.length > 0 && (
                  <img src={article.image[0]} alt={article.title} className="h-12 w-12 object-cover rounded" />
                )}
              </td>
              <td className="admin-table-cell-text-truncate">{article.title}</td>
              <td className="admin-table-cell text-gray-500">{article.category?.name || 'Uncategorized'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(article)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(article.id)}
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

export default NewsTable;